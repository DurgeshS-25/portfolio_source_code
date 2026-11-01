// Fetches every enabled source and merges the results into src/data/posts.json.
// Usage: npm run sync:blog
//
// - Posts are merged by id, so posts that drop out of a feed (Medium only lists the latest 10) are kept.
// - If a source fails, its previously stored posts are kept and the script exits non-zero
//   after writing whatever the other sources returned.
// - The file is rewritten only when its contents change, so the workflow commits only real updates.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sources from './config.mjs';
import { byNewest, validatePost } from './post.mjs';

const OUTPUT = fileURLToPath(new URL('../../src/data/posts.json', import.meta.url));

const readExisting = async (file) => {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
};

export const mergePosts = (existing, fetched) => {
  const byId = new Map(existing.map((p) => [p.id, p]));
  fetched.forEach((p) => byId.set(p.id, p));
  return [...byId.values()].sort(byNewest);
};

export const sync = async ({ output = OUTPUT, enabled = sources, log = console } = {}) => {
  const existing = await readExisting(output);
  const fetched = [];
  const failures = [];

  for (const { adapter, config } of enabled) {
    try {
      const posts = (await adapter.fetchPosts(config)).map(validatePost);
      if (posts.length === 0) throw new Error('feed returned no posts');
      fetched.push(...posts);
      log.info(`${adapter.source}: ${posts.length} posts`);
    } catch (err) {
      failures.push(adapter.source);
      log.error(`${adapter.source}: ${err.message} (keeping stored posts)`);
    }
  }

  const merged = mergePosts(existing, fetched);
  const next = `${JSON.stringify(merged, null, 2)}\n`;
  const changed = next !== `${JSON.stringify(existing, null, 2)}\n`;
  if (changed) await writeFile(output, next);
  log.info(changed ? `Wrote ${merged.length} posts to ${output}` : 'No changes');

  return { changed, failures, posts: merged };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { failures } = await sync();
  if (failures.length) process.exitCode = 1;
}
