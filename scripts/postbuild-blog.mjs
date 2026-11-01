// Runs after `react-scripts build` (npm's postbuild hook). Writes build/blog/index.html: the same
// app shell as build/index.html, but with the blog's own title, description, canonical URL, and
// Open Graph tags, so /blog has correct metadata for crawlers and link previews.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = (p) => fileURLToPath(new URL(`../${p}`, import.meta.url));
const meta = JSON.parse(await readFile(root('src/data/blogMeta.json'), 'utf8'));
let html = await readFile(root('build/index.html'), 'utf8');

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const origin = new URL(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? '').origin;
const url = `${origin}${meta.path}`;

const replacements = [
  [/<title>[^<]*<\/title>/, `<title>${attr(meta.title)}</title>`],
  [/(<meta name="description" content=")[^"]*"/, `$1${attr(meta.description)}"`],
  [/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`],
  [/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`],
  [/(<meta property="og:title" content=")[^"]*"/, `$1${attr(meta.title)}"`],
  [/(<meta property="og:description" content=")[^"]*"/, `$1${attr(meta.description)}"`],
];

// Fail the build if public/index.html changes shape, rather than silently shipping home-page tags.
for (const [pattern, value] of replacements) {
  if (!pattern.test(html)) throw new Error(`postbuild-blog: no match for ${pattern} in build/index.html`);
  html = html.replace(pattern, value);
}

await mkdir(root('build/blog'), { recursive: true });
await writeFile(root('build/blog/index.html'), html);
console.log(`postbuild-blog: wrote build/blog/index.html (${url})`);
