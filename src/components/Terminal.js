import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { complete, runCommand } from '../data/terminalCommands';

const INTRO_COMMAND = 'whoami';
const HINTS = ['help', 'projects', 'skills', 'contact', 'sudo hire-me'];

const toneClass = {
  accent: 'text-emerald-400',
  muted: 'text-stone-500',
  error: 'text-rose-400',
};

const Line = ({ line, index }) => {
  const { text, tone, href } = typeof line === 'string' ? { text: line } : line;
  const className = `whitespace-pre-wrap break-words ${toneClass[tone] || 'text-stone-300'}`;
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.03, 0.4) }}
      className={className}
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="underline decoration-emerald-500/40 underline-offset-2 hover:decoration-emerald-400"
        >
          {text}
        </a>
      ) : (
        text
      )}
    </motion.div>
  );
};

const Prompt = () => (
  <span aria-hidden="true" className="select-none">
    <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span>{' '}
  </span>
);

const Terminal = ({ onNavigate, onToggleTheme }) => {
  const reduceMotion = useReducedMotion();
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(''); // intro text being "typed"
  const [introDone, setIntroDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const nextId = useRef(0);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const perform = useCallback(
    (action) => {
      if (!action) return;
      if (action.type === 'open') {
        if (action.url.startsWith('mailto:')) window.location.href = action.url;
        else window.open(action.url, '_blank', 'noopener,noreferrer');
      } else if (action.type === 'goto') {
        onNavigate(action.id);
      } else if (action.type === 'theme') {
        onToggleTheme();
      }
    },
    [onNavigate, onToggleTheme]
  );

  const execute = useCallback(
    (command, { record = true } = {}) => {
      const result = runCommand(command);
      if (result.clear) {
        setEntries([]);
      } else {
        nextId.current += 1;
        setEntries((prev) => [...prev, { id: nextId.current, command, lines: result.lines }]);
      }
      if (record && command.trim()) {
        setHistory((prev) => [...prev, command]);
      }
      setHistoryIndex(-1);
      perform(result.action);
    },
    [perform]
  );

  const finishIntro = useCallback(() => {
    setTyping('');
    setIntroDone(true);
    nextId.current += 1;
    const { lines } = runCommand(INTRO_COMMAND);
    setEntries([
      { id: nextId.current, command: INTRO_COMMAND, lines: [...lines, '', { text: "Type 'help' to explore, or tap a command below.", tone: 'muted' }] },
    ]);
  }, []);

  // Autoplay: type `whoami` one character at a time, then print its output.
  useEffect(() => {
    if (introDone) return undefined;
    if (reduceMotion) {
      finishIntro();
      return undefined;
    }
    const timers = [];
    const start = 600;
    INTRO_COMMAND.split('').forEach((_, i) => {
      timers.push(setTimeout(() => setTyping(INTRO_COMMAND.slice(0, i + 1)), start + i * 90));
    });
    timers.push(setTimeout(finishIntro, start + INTRO_COMMAND.length * 90 + 350));
    return () => timers.forEach(clearTimeout);
  }, [introDone, reduceMotion, finishIntro]);

  // Keep the newest output in view (scroll the terminal body only, never the page).
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [entries]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      execute(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      if (!history.length) return;
      e.preventDefault();
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      if (historyIndex === -1) return;
      e.preventDefault();
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Tab' && input) {
      // Only capture Tab when there is something to complete, so keyboard users can still tab away.
      e.preventDefault();
      const completed = complete(input);
      if (completed) setInput(`${completed} `);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  const focusInput = () => {
    if (window.getSelection?.().toString()) return; // don't break text selection
    if (!introDone) finishIntro();
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <div>
      <div className="relative rounded-xl border border-stone-800 bg-stone-950 shadow-2xl shadow-emerald-900/20 overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-stone-800 bg-stone-900">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" aria-hidden="true" />
          <span className="flex-1 text-center font-mono text-xs text-stone-400 -ml-12">durgesh@portfolio: ~</span>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          onClick={focusInput}
          className="h-72 md:h-80 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed cursor-text"
        >
          <div role="log" aria-live="polite" aria-label="Terminal output" className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id}>
                <div className="text-stone-100">
                  <Prompt />
                  {entry.command}
                </div>
                {entry.lines.map((line, i) => (
                  <Line key={i} line={line} index={i} />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center text-stone-100 mt-3">
            <Prompt />
            {introDone ? (
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent outline-none caret-emerald-400 text-base md:text-[13px] text-stone-100"
              />
            ) : (
              <span>
                {typing}
                <span className="terminal-cursor text-emerald-400" aria-hidden="true">▌</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tappable hints for visitors who won't type */}
      <div className="flex flex-wrap gap-2 mt-3" aria-label="Suggested commands">
        {HINTS.map((hint) => (
          <motion.button
            key={hint}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!introDone) finishIntro();
              execute(hint);
            }}
            className="px-2.5 py-1 rounded-md font-mono text-xs border border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
          >
            $ {hint}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
