import blogMeta from './data/blogMeta.json';
import BlogPage from './components/BlogPage';
import Portfolio from './components/Portfolio';

// Two pages, each a full page load, so a router isn't needed. Netlify serves build/blog/index.html
// (written by scripts/postbuild-blog.mjs) at /blog.
const isBlogPath = () => window.location.pathname.replace(/\/+$/, '') === blogMeta.path;

function App() {
  return isBlogPath() ? <BlogPage /> : <Portfolio />;
}

export default App;
