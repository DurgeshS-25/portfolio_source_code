import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { navItems, profile } from './data/portfolio';

beforeEach(() => {
  document.documentElement.classList.add('dark');
  localStorage.clear();
});

test('renders the name heading, every nav item, and the resume link', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
  const nav = screen.getByRole('navigation', { name: 'Primary' });
  navItems.forEach(({ label }) => {
    expect(nav).toHaveTextContent(label);
  });
  expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', profile.resume);
});

test('theme toggle flips the dark class on <html> and persists the choice', () => {
  render(<App />);
  const [toggle] = screen.getAllByRole('button', { name: /switch to light theme/i });
  fireEvent.click(toggle);
  expect(document.documentElement).not.toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('light');
  expect(screen.getAllByRole('button', { name: /switch to dark theme/i }).length).toBeGreaterThan(0);
});
