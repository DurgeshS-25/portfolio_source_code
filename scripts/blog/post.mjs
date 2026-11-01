import he from 'he';

/**
 * The normalized shape every source adapter produces and the UI consumes (src/data/posts.json).
 * @typedef {Object} Post
 * @property {string} id           `<source>:<source-specific id>`, stable across syncs
 * @property {string} title
 * @property {string} url          canonical link to the original post
 * @property {string} publishedAt  ISO 8601
 * @property {string} updatedAt    ISO 8601
 * @property {string} excerpt      plain text, at most EXCERPT_LENGTH characters
 * @property {string|null} coverImage
 * @property {string[]} tags
 * @property {'medium'|'linkedin'} source
 * @property {number} readingTime  minutes, at least 1
 */

/**
 * A source adapter. Each module in ./sources exports one.
 * @typedef {Object} SourceAdapter
 * @property {Post['source']} source
 * @property {(config: Object) => Promise<Post[]>} fetchPosts
 */

export const SOURCES = ['medium', 'linkedin'];
export const EXCERPT_LENGTH = 200;
const WORDS_PER_MINUTE = 265; // Medium's own reading-time rate.

// Blocks that read badly as excerpt text: code, captions, embedded media.
const NON_PROSE = /<(script|style|pre|figure|iframe|noscript)\b[\s\S]*?<\/\1>/gi;
const HEADINGS = /<(h[1-6])\b[\s\S]*?<\/\1>/gi;
const BLOCK_TAG = /<\/?(p|div|h[1-6]|li|ul|ol|blockquote|br|hr|figure|table|tr|td|th)\b[^>]*>/gi;

// Block tags become spaces so paragraphs don't run together; inline tags (<a>, <strong>, …)
// are removed outright so "<a>link</a>," stays "link,". The result is only ever rendered
// as React text, never as HTML.
export const htmlToText = (html, { dropHeadings = false } = {}) => {
  let s = String(html || '').replace(NON_PROSE, ' ');
  if (dropHeadings) s = s.replace(HEADINGS, ' ');
  s = s.replace(/<!--[\s\S]*?-->/g, ' ').replace(BLOCK_TAG, ' ').replace(/<[^>]*>/g, '');
  return he.decode(s).replace(/\s+/g, ' ').trim();
};

export const excerpt = (text, max = EXCERPT_LENGTH) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.–—-]+$/, '')}…`;
};

export const readingTime = (text) => {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

// First real image in the HTML. `skip` filters out tracking pixels and the like.
export const firstImage = (html, skip = () => false) => {
  const re = /<img\b[^>]*?\bsrc\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(String(html || ''))) !== null) {
    const src = he.decode(m[1]);
    if (/^https:\/\//i.test(src) && !skip(src)) return src;
  }
  return null;
};

const isIsoDate = (s) => typeof s === 'string' && !Number.isNaN(Date.parse(s));

// Throws with the field name so a feed format change fails loudly instead of writing junk.
export const validatePost = (p) => {
  const fail = (field) => {
    throw new Error(`Invalid post ${p?.id ?? '(no id)'}: bad ${field}`);
  };
  if (!p || typeof p !== 'object') fail('object');
  if (typeof p.id !== 'string' || !p.id.startsWith(`${p.source}:`)) fail('id');
  if (!SOURCES.includes(p.source)) fail('source');
  if (typeof p.title !== 'string' || !p.title.trim()) fail('title');
  if (typeof p.url !== 'string' || !/^https:\/\//.test(p.url)) fail('url');
  if (!isIsoDate(p.publishedAt)) fail('publishedAt');
  if (!isIsoDate(p.updatedAt)) fail('updatedAt');
  if (typeof p.excerpt !== 'string' || p.excerpt.length > EXCERPT_LENGTH) fail('excerpt');
  if (p.coverImage !== null && (typeof p.coverImage !== 'string' || !/^https:\/\//.test(p.coverImage))) fail('coverImage');
  if (!Array.isArray(p.tags) || !p.tags.every((t) => typeof t === 'string')) fail('tags');
  if (!Number.isInteger(p.readingTime) || p.readingTime < 1) fail('readingTime');
  return p;
};

export const byNewest = (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
