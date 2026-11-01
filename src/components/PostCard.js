import { useState } from 'react';
import { motion } from 'motion/react';
import { formatDate, sourceMeta } from '../data/blog';
import Reveal from './Reveal';
import { accent, muted } from './styles';

// Shown when a post has no image, or its image fails to load.
const CoverFallback = ({ label }) => (
  <div className="relative h-full w-full bg-gradient-to-br from-emerald-700/25 via-stone-100 to-stone-200 dark:from-emerald-500/20 dark:via-stone-900 dark:to-stone-800">
    <div className="hero-grid absolute inset-0" />
    <span className={`absolute bottom-3 left-4 font-mono text-sm ${accent}`}>~/{label.toLowerCase()}</span>
  </div>
);

const SourceBadge = ({ label }) => (
  <span className="px-2 py-0.5 rounded font-mono text-xs bg-emerald-500/10 ring-1 ring-emerald-500/30 text-emerald-700 dark:text-emerald-400">
    {label}
  </span>
);

const PostCard = ({ id, title, url, publishedAt, excerpt, coverImage, tags, source, readingTime, index = 0 }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const { label } = sourceMeta[source] ?? { label: source };
  const headingId = `post-${id.replace(/[^a-z0-9]+/gi, '-')}`;

  return (
    <Reveal delay={Math.min(index, 5) * 0.08} className="h-full">
      <motion.article
        aria-labelledby={headingId}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glow-card group h-full flex flex-col rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl hover:shadow-emerald-900/10 transition-shadow"
      >
        <div className="aspect-video overflow-hidden rounded-t-xl border-b border-stone-200 dark:border-stone-800">
          {coverImage && !imageFailed ? (
            <img
              src={coverImage}
              alt=""
              loading="lazy"
              decoding="async"
              width="1024"
              height="576"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <CoverFallback label={label} />
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 text-xs ${muted}`}>
            <SourceBadge label={label} />
            <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingTime} min read</span>
          </div>

          <h3 id={headingId} className="text-lg font-semibold leading-snug mb-2">
            {/* The ::after overlay stretches the link over the whole card. */}
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:rounded-xl group-hover:text-emerald-700 dark:group-hover:text-emerald-500 transition-colors"
            >
              {title}
              <span className="sr-only"> (opens in new tab on {label})</span>
            </a>
          </h3>

          {excerpt && <p className={`text-sm leading-relaxed ${muted} mb-4`}>{excerpt}</p>}

          {tags.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-2" aria-label="Tags">
              {tags.slice(0, 3).map((t) => (
                <li
                  key={t}
                  className="px-2 py-0.5 rounded font-mono text-xs border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.article>
    </Reveal>
  );
};

export const PostGrid = ({ posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.map((post, i) => (
      <PostCard key={post.id} {...post} index={i} />
    ))}
  </div>
);

export default PostCard;
