import { ArrowRight } from 'lucide-react';
import { latestPosts } from '../data/blog';
import blogMeta from '../data/blogMeta.json';
import { PostGrid } from './PostCard';
import Section from './Section';
import { btnSecondary } from './styles';

// Home page teaser for the blog. Renders nothing until there is at least one post.
const LatestPosts = ({ number, posts = latestPosts(3) }) => {
  if (!posts.length) return null;
  return (
    <Section id="writing" number={number} title="Latest Writing">
      <PostGrid posts={posts} />
      <div className="mt-10 text-center">
        <a href={blogMeta.path} className={`${btnSecondary} px-5 py-2.5 group`}>
          All posts
          <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </Section>
  );
};

export default LatestPosts;
