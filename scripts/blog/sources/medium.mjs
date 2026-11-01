import { XMLParser } from 'fast-xml-parser';
import { excerpt, firstImage, htmlToText, readingTime } from '../post.mjs';

const parser = new XMLParser({
  ignoreAttributes: false,
  isArray: (name) => name === 'item' || name === 'category',
});

// Medium appends a 1x1 view-tracking image to every post.
const isTrackingPixel = (src) => /medium\.com\/_\/stat/.test(src);

const text = (node) => (typeof node === 'object' && node !== null ? node['#text'] : node) ?? '';

const cleanUrl = (link) => {
  const url = new URL(text(link));
  url.search = '';
  url.hash = '';
  return url.toString();
};

// guid looks like https://medium.com/p/2847c9b03eaa
const postId = (item) => {
  const guid = String(text(item.guid));
  const m = guid.match(/\/p\/([0-9a-f]+)$/i);
  if (!m) throw new Error(`Unexpected Medium guid: ${guid}`);
  return m[1];
};

/** @returns {import('../post.mjs').Post[]} */
export const parseFeed = (xml) => {
  const channel = parser.parse(xml)?.rss?.channel;
  if (!channel) throw new Error('Not a Medium RSS feed: missing rss.channel');

  return (channel.item || []).map((item) => {
    const html = text(item['content:encoded']);
    const publishedAt = new Date(text(item.pubDate)).toISOString();
    const updated = text(item['atom:updated']);
    return {
      id: `medium:${postId(item)}`,
      title: String(text(item.title)).trim(),
      url: cleanUrl(item.link),
      publishedAt,
      updatedAt: updated ? new Date(updated).toISOString() : publishedAt,
      excerpt: excerpt(htmlToText(html, { dropHeadings: true })),
      coverImage: firstImage(html, isTrackingPixel),
      tags: (item.category || []).map((c) => String(text(c)).trim()).filter(Boolean),
      source: 'medium',
      readingTime: readingTime(htmlToText(html)),
    };
  });
};

/** @type {import('../post.mjs').SourceAdapter} */
const medium = {
  source: 'medium',
  async fetchPosts({ username }) {
    const res = await fetch(`https://medium.com/feed/@${username}`, {
      headers: { 'User-Agent': 'portfolio-blog-sync (+https://durgesh25.netlify.app)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new Error(`Medium feed returned HTTP ${res.status}`);
    return parseFeed(await res.text());
  },
};

export default medium;
