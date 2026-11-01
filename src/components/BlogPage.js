import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { posts as allPosts } from '../data/blog';
import blogMeta from '../data/blogMeta.json';
import { profile } from '../data/portfolio';
import useTheme from '../hooks/useTheme';
import { PostGrid } from './PostCard';
import Section from './Section';
import SiteLayout from './SiteLayout';
import { btnSecondary, card, muted } from './styles';

const MediumLink = ({ children }) => (
  <a href={profile.medium} target="_blank" rel="noopener noreferrer" className={`${btnSecondary} px-4 py-2 text-sm`}>
    {children}
    <ExternalLink size={14} className="ml-2" aria-hidden="true" />
  </a>
);

const EmptyState = () => (
  <div className={`${card} text-center`}>
    <p className="font-mono text-sm text-emerald-700 dark:text-emerald-500 mb-2">$ ls ~/blog</p>
    <p className="text-lg font-semibold mb-2">No posts yet</p>
    <p className={`${muted} mb-6`}>New writing shows up here automatically once it's published.</p>
    <MediumLink>Visit Medium</MediumLink>
  </div>
);

// `posts` is injectable for tests.
const BlogPage = ({ posts = allPosts }) => {
  const { isDark, toggleTheme } = useTheme();

  // The static title for /blog comes from scripts/postbuild-blog.mjs; this keeps dev in sync.
  useEffect(() => {
    document.title = blogMeta.title;
  }, []);

  return (
    <SiteLayout activeSection="blog" isDark={isDark} onToggleTheme={toggleTheme}>
      <Section id="blog" title="Blog" headingAs="h1" width="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 -mt-4 mb-10">
          <p className={`${muted} max-w-2xl`}>
            Notes on backend systems, data pipelines, and things I learned the hard way. Posts link out to
            the original.
          </p>
          {posts.length > 0 && <MediumLink>Follow on Medium</MediumLink>}
        </div>
        {posts.length > 0 ? <PostGrid posts={posts} /> : <EmptyState />}
      </Section>
    </SiteLayout>
  );
};

export default BlogPage;
