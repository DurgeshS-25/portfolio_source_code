import { education, experience, navItems, profile, projects, skills } from './portfolio';

// Pure command handlers for the hero terminal.
// runCommand returns { lines, action?, clear? }. A line is a string or { text, tone?, href? }.
// Actions are performed by the Terminal component: { type: 'open', url } | { type: 'goto', id } | { type: 'theme' }.

const sectionIds = navItems.map((item) => item.id);

const COMMANDS = {
  help: 'list available commands',
  whoami: 'who I am',
  ls: 'list sections of this site',
  'goto <section>': 'scroll to a section (alias: cd)',
  skills: 'my technical stack',
  experience: 'where I have worked',
  projects: 'featured work, with repo links',
  education: 'degrees',
  contact: 'how to reach me',
  resume: 'open my resume',
  github: 'open my GitHub',
  linkedin: 'open my LinkedIn',
  theme: 'toggle light/dark theme',
  clear: 'clear the terminal (Ctrl+L)',
};

export const commandNames = [
  'help', 'whoami', 'ls', 'goto', 'cd', 'skills', 'experience', 'projects', 'education',
  'contact', 'resume', 'github', 'linkedin', 'theme', 'clear', 'sudo',
];

const hireMeUrl = `mailto:${profile.email}?subject=${encodeURIComponent("Let's talk about a role")}`;

const levenshtein = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
};

const suggest = (cmd) => {
  const best = commandNames
    .map((name) => ({ name, dist: levenshtein(cmd, name) }))
    .sort((x, y) => x.dist - y.dist)[0];
  return best && best.dist <= 2 ? best.name : null;
};

const open = (label, url) => ({ lines: [{ text: `Opening ${label}…`, tone: 'muted' }], action: { type: 'open', url } });

const goto = (arg) => {
  const id = (arg || '').replace(/^~?\/?/, '').replace(/\/$/, '').toLowerCase();
  if (!id) return { lines: [{ text: `usage: goto <section>   sections: ${sectionIds.join(', ')}`, tone: 'muted' }] };
  if (!sectionIds.includes(id)) {
    return {
      lines: [
        { text: `no such section: ${id}`, tone: 'error' },
        { text: `available: ${sectionIds.join(', ')}`, tone: 'muted' },
      ],
    };
  }
  return { lines: [{ text: `cd ~/${id}`, tone: 'muted' }], action: { type: 'goto', id } };
};

export const runCommand = (raw) => {
  const input = raw.trim();
  if (!input) return { lines: [] };

  const [cmd, ...args] = input.split(/\s+/);
  const name = cmd.toLowerCase();
  const arg = args.join(' ');

  switch (name) {
    case 'help': {
      const width = Math.max(...Object.keys(COMMANDS).map((k) => k.length)) + 3;
      return {
        lines: [
          { text: 'Available commands:', tone: 'accent' },
          ...Object.entries(COMMANDS).map(([k, v]) => `  ${k.padEnd(width)}${v}`),
        ],
      };
    }
    case 'whoami':
      return {
        lines: [
          { text: `${profile.name} — ${profile.title}`, tone: 'accent' },
          `location  ${profile.location}`,
          `stack     ${profile.focus}`,
          `status    ${profile.status}`,
        ],
      };
    case 'ls':
      return { lines: [{ text: sectionIds.map((id) => `${id}/`).join('  '), tone: 'accent' }] };
    case 'goto':
    case 'cd':
      return goto(arg);
    case 'skills': {
      const width = Math.max(...skills.map((s) => s.category.length)) + 3;
      return { lines: skills.map(({ category, items }) => `${category.padEnd(width)}${items.join(', ')}`) };
    }
    case 'experience':
      return {
        lines: experience.flatMap((job) => [
          { text: `${job.role} @ ${job.company}  (${job.period})`, tone: 'accent' },
          ...job.bullets.map((b) => `  ▹ ${b}`),
        ]),
      };
    case 'projects':
      return {
        lines: projects.flatMap((p) => [
          { text: p.name, tone: 'accent', href: p.repo },
          { text: `  ${p.stack.join(' • ')}`, tone: 'muted' },
        ]),
      };
    case 'education':
      return {
        lines: education.map((e) => `${e.degree} — ${e.school}  (${e.period})`),
      };
    case 'contact':
      return {
        lines: [
          { text: `email     ${profile.email}`, href: `mailto:${profile.email}` },
          { text: `linkedin  ${profile.linkedin}`, href: profile.linkedin },
          { text: `github    ${profile.github}`, href: profile.github },
          `location  ${profile.location}`,
        ],
      };
    case 'resume':
      return open('resume', profile.resume);
    case 'github':
      return open('GitHub', profile.github);
    case 'linkedin':
      return open('LinkedIn', profile.linkedin);
    case 'theme':
      return { lines: [{ text: 'Toggling theme…', tone: 'muted' }], action: { type: 'theme' } };
    case 'clear':
      return { lines: [], clear: true };
    case 'sudo':
      if (arg.toLowerCase() === 'hire-me') {
        return {
          lines: [
            { text: '[sudo] password for recruiter: ********', tone: 'muted' },
            { text: '✓ Access granted. Opening your mail client…', tone: 'accent' },
          ],
          action: { type: 'open', url: hireMeUrl },
        };
      }
      return { lines: [{ text: "Nice try. The only sudo command allowed here is 'sudo hire-me'.", tone: 'error' }] };
    default: {
      const hint = suggest(name);
      return {
        lines: [
          { text: `command not found: ${cmd}`, tone: 'error' },
          { text: hint ? `Did you mean '${hint}'?` : "Type 'help' to see available commands.", tone: 'muted' },
        ],
      };
    }
  }
};

// Tab completion: returns the completed input, or null if there is no single match.
export const complete = (input) => {
  const gotoMatch = input.match(/^(goto|cd)\s+(\S*)$/i);
  if (gotoMatch) {
    const matches = sectionIds.filter((id) => id.startsWith(gotoMatch[2].toLowerCase()));
    return matches.length === 1 ? `${gotoMatch[1]} ${matches[0]}` : null;
  }
  if (/\s/.test(input) || !input) return null;
  const matches = commandNames.filter((c) => c.startsWith(input.toLowerCase()));
  return matches.length === 1 ? matches[0] : null;
};
