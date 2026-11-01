import medium from './sources/medium.mjs';

// Enabled sources. To add one, write an adapter in ./sources (see SourceAdapter in post.mjs)
// and list it here; the UI picks up anything in src/data/posts.json.
const sources = [
  { adapter: medium, config: { username: 'durgeshss25' } },
];

export default sources;
