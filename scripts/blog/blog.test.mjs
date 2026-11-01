import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { excerpt, readingTime, validatePost } from './post.mjs';
import { parseFeed } from './sources/medium.mjs';
import { sync } from './sync.mjs';

const xml = await readFile(new URL('./fixtures/medium-feed.xml', import.meta.url), 'utf8');
const [ocr, cart] = parseFeed(xml);
const quiet = { info() {}, error() {} };

test('maps Medium items to normalized posts', () => {
  assert.deepEqual(
    { ...ocr, excerpt: undefined },
    {
      id: 'medium:2847c9b03eaa',
      title: 'Idempotent OCR Ingestion',
      url: 'https://medium.com/@durgeshss25/idempotent-ocr-ingestion-2847c9b03eaa',
      publishedAt: '2026-02-21T15:01:18.000Z',
      updatedAt: '2026-02-22T09:00:00.000Z',
      excerpt: undefined,
      coverImage: 'https://cdn-images-1.medium.com/max/1024/1*cover.gif',
      tags: ['ocr', 'healthcare'],
      source: 'medium',
      readingTime: 1,
    }
  );
  assert.doesNotThrow(() => validatePost(ocr));
  assert.doesNotThrow(() => validatePost(cart));
});

test('excerpt is plain text without headings, captions, or code, with entities decoded', () => {
  assert.equal(
    ocr.excerpt,
    "The OCR part was straightforward. Making it bulletproof was a different story & that's what this post is about. Second paragraph, led by a link."
  );
});

test('skips the tracking pixel, so an image-less post has no cover', () => {
  assert.equal(cart.coverImage, null);
  assert.deepEqual(cart.tags, []);
  assert.equal(cart.updatedAt, cart.publishedAt);
});

test('excerpt cuts long text at a word boundary', () => {
  const long = 'word '.repeat(100).trim();
  const out = excerpt(long, 50);
  assert.ok(out.length <= 50);
  assert.match(out, /word…$/);
});

test('reading time is at least a minute and grows with length', () => {
  assert.equal(readingTime(''), 1);
  assert.equal(readingTime('w '.repeat(800)), 4);
});

test('rejects a feed without a channel', () => {
  assert.throws(() => parseFeed('<html></html>'), /missing rss.channel/);
});

test('sync merges by id, keeps old posts, and only writes on change', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'blog-sync-'));
  const output = join(dir, 'posts.json');
  const old = { ...cart, id: 'medium:aaaaaaaaaaaa', publishedAt: '2020-01-01T00:00:00.000Z' };
  await writeFile(output, JSON.stringify([old]));

  const adapter = { source: 'medium', fetchPosts: async () => [cart, ocr] };
  const first = await sync({ output, enabled: [{ adapter, config: {} }], log: quiet });
  assert.equal(first.changed, true);
  assert.deepEqual(first.posts.map((p) => p.id), [ocr.id, cart.id, old.id]);

  const second = await sync({ output, enabled: [{ adapter, config: {} }], log: quiet });
  assert.equal(second.changed, false);
});

test('a failing or invalid source keeps stored posts and reports the failure', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'blog-sync-'));
  const output = join(dir, 'posts.json');
  await writeFile(output, `${JSON.stringify([ocr], null, 2)}\n`);

  const down = { source: 'medium', fetchPosts: async () => { throw new Error('HTTP 503'); } };
  const junk = { source: 'medium', fetchPosts: async () => [{ ...ocr, url: 'not a url' }] };
  for (const adapter of [down, junk]) {
    const result = await sync({ output, enabled: [{ adapter, config: {} }], log: quiet });
    assert.deepEqual(result.failures, ['medium']);
    assert.equal(result.changed, false);
    assert.deepEqual(JSON.parse(await readFile(output, 'utf8')), [ocr]);
  }
});
