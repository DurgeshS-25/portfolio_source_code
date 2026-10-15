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

test('selecting a skill chip dims projects that do not use it', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: 'Elasticsearch' }));
  expect(screen.getByRole('article', { name: 'Intelligent Research Assistant' })).not.toHaveAttribute('data-dimmed');
  expect(screen.getByRole('article', { name: 'AI Fitness Tracker' })).toHaveAttribute('data-dimmed', 'true');
  expect(screen.getByRole('status')).toHaveTextContent('Elasticsearch shows up in 1 project');

  fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
  expect(screen.getByRole('article', { name: 'AI Fitness Tracker' })).not.toHaveAttribute('data-dimmed');
});

test('terminal runs a command typed by the user', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: '$ help' }));
  const input = screen.getByRole('textbox', { name: 'Terminal command' });
  fireEvent.change(input, { target: { value: 'education' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  expect(screen.getByRole('log', { name: 'Terminal output' })).toHaveTextContent('Northeastern University');
});
