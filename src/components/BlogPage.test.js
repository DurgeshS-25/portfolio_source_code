import { fireEvent, render, screen, within } from '@testing-library/react';
import BlogPage from './BlogPage';

const post = (overrides) => ({
  id: 'medium:aaa',
  title: 'Older post',
  url: 'https://medium.com/@durgeshss25/older-aaa',
  publishedAt: '2024-09-28T21:33:26.000Z',
  updatedAt: '2024-09-28T21:33:26.000Z',
  excerpt: 'An older excerpt.',
  coverImage: 'https://cdn-images-1.medium.com/max/1024/older.png',
  tags: ['ecommerce'],
  source: 'medium',
  readingTime: 4,
  ...overrides,
});

const posts = [
  post({ id: 'medium:bbb', title: 'Newer post', publishedAt: '2026-02-21T15:01:18.000Z', coverImage: null, tags: [] }),
  post(),
];

test('lists posts with date, reading time, and source, linking out in a new tab', () => {
  render(<BlogPage posts={posts} />);
  expect(screen.getByRole('heading', { level: 1, name: 'Blog' })).toBeInTheDocument();

  const articles = screen.getAllByRole('article');
  expect(articles.map((a) => within(a).getByRole('heading').textContent)).toEqual([
    'Newer post (opens in new tab on Medium)',
    'Older post (opens in new tab on Medium)',
  ]);

  const older = within(articles[1]);
  expect(older.getByText('Sep 28, 2024')).toHaveAttribute('dateTime', '2024-09-28T21:33:26.000Z');
  expect(older.getByText('4 min read')).toBeInTheDocument();
  expect(older.getByText('Medium')).toBeInTheDocument();
  expect(older.getByText('ecommerce')).toBeInTheDocument();
  const link = older.getByRole('link', { name: /older post/i });
  expect(link).toHaveAttribute('href', 'https://medium.com/@durgeshss25/older-aaa');
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('falls back to a placeholder when there is no cover or it fails to load', () => {
  const { container } = render(<BlogPage posts={posts} />);
  const imgs = container.querySelectorAll('article img');
  expect(imgs).toHaveLength(1);
  fireEvent.error(imgs[0]);
  expect(container.querySelectorAll('article img')).toHaveLength(0);
});

test('shows an empty state when there are no posts', () => {
  render(<BlogPage posts={[]} />);
  expect(screen.getByText('No posts yet')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /visit medium/i })).toHaveAttribute('href', 'https://medium.com/@durgeshss25');
});

test('header items link back to home page sections', () => {
  render(<BlogPage posts={posts} />);
  const nav = screen.getByRole('navigation', { name: 'Primary' });
  expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/#projects');
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
});
