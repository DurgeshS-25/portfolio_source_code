import { complete, runCommand } from './terminalCommands';
import { navItems, profile } from './portfolio';

const text = (lines) => lines.map((l) => (typeof l === 'string' ? l : l.text)).join('\n');

test('help lists the main commands', () => {
  const out = text(runCommand('help').lines);
  ['whoami', 'projects', 'goto <section>', 'clear'].forEach((cmd) => expect(out).toContain(cmd));
});

test('whoami prints the name and title from portfolio data', () => {
  expect(text(runCommand('whoami').lines)).toContain(`${profile.name} — ${profile.title}`);
});

test('unknown commands suggest the closest match', () => {
  const out = text(runCommand('skils').lines);
  expect(out).toContain('command not found: skils');
  expect(out).toContain("Did you mean 'skills'?");
});

test('goto and cd return a navigation action for valid sections only', () => {
  expect(runCommand('goto projects').action).toEqual({ type: 'goto', id: 'projects' });
  expect(runCommand('cd ~/contact/').action).toEqual({ type: 'goto', id: 'contact' });
  const bad = runCommand('goto nowhere');
  expect(bad.action).toBeUndefined();
  expect(text(bad.lines)).toContain(navItems.map((n) => n.id).join(', '));
});

test('clear, theme, resume and sudo hire-me', () => {
  expect(runCommand('clear').clear).toBe(true);
  expect(runCommand('THEME').action).toEqual({ type: 'theme' });
  expect(runCommand('resume').action).toEqual({ type: 'open', url: profile.resume });
  expect(runCommand('sudo hire-me').action.url).toMatch(/^mailto:/);
  expect(runCommand('sudo rm -rf /').action).toBeUndefined();
});

test('tab completion completes unique commands and section names', () => {
  expect(complete('pro')).toBe('projects');
  expect(complete('goto ed')).toBe('goto education');
  expect(complete('c')).toBeNull(); // ambiguous: cd, clear, contact
});
