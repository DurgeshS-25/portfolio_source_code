import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Database, ScanText, ShieldCheck, Shuffle, Upload } from 'lucide-react';
import { muted } from './styles';

const icons = { upload: Upload, ocr: ScanText, validate: ShieldCheck, normalize: Shuffle, store: Database };

const SPAWN_MS = 1100;
const TRAVEL_S = 4.2;
const FAIL_EVERY = 4; // every Nth packet fails schema validation

// Horizontal center of stage i, as a percentage of the track width.
const stageX = (i, count) => ((i + 0.5) / count) * 100;

const Packet = ({ fails, count, validateIndex, onDone }) => {
  const start = `${stageX(0, count)}%`;
  const end = `${stageX(count - 1, count)}%`;
  const failAt = `${stageX(validateIndex, count)}%`;
  // Fraction of the run at which a failing packet reaches the Validate stage.
  const t = validateIndex / (count - 1);

  return (
    <motion.span
      aria-hidden="true"
      className="absolute -ml-1.5 -mt-1.5 w-3 h-3 rounded-full shadow-[0_0_10px_2px] z-0"
      initial={{ left: start, top: 20, backgroundColor: '#34d399', color: 'rgba(52,211,153,0.6)', opacity: 0 }}
      animate={
        fails
          ? {
              left: [start, failAt, failAt],
              top: [20, 20, 104],
              backgroundColor: ['#34d399', '#34d399', '#f43f5e'],
              color: ['rgba(52,211,153,0.6)', 'rgba(52,211,153,0.6)', 'rgba(244,63,94,0.6)'],
              opacity: [1, 1, 0],
            }
          : { left: [start, end], opacity: [1, 1, 1, 0] }
      }
      transition={
        fails
          ? { duration: TRAVEL_S * t + 0.9, times: [0, (TRAVEL_S * t) / (TRAVEL_S * t + 0.9), 1], ease: 'linear' }
          : { duration: TRAVEL_S, ease: 'linear' }
      }
      onAnimationComplete={onDone}
    />
  );
};

const PipelineDiagram = ({ stages }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [packets, setPackets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [stats, setStats] = useState({ stored: 0, failed: 0 });
  const counter = useRef(0);

  const validateIndex = Math.max(0, stages.findIndex((s) => s.icon === 'validate'));
  const running = inView && !reduceMotion && selected === null;

  // Spawn packets while the diagram is visible and not paused.
  useEffect(() => {
    if (!running) return undefined;
    const spawn = () => {
      counter.current += 1;
      const id = counter.current;
      setPackets((prev) => [...prev, { id, fails: id % FAIL_EVERY === 0 }]);
    };
    spawn();
    const timer = setInterval(spawn, SPAWN_MS);
    return () => clearInterval(timer);
  }, [running]);

  const finish = (packet) => {
    setPackets((prev) => prev.filter((p) => p.id !== packet.id));
    setStats((s) => (packet.fails ? { ...s, failed: s.failed + 1 } : { ...s, stored: s.stored + 1 }));
  };

  const active = selected === null ? null : stages[selected];

  return (
    <div ref={ref} className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center justify-between mb-4 text-xs font-mono">
        <span className={`uppercase tracking-wider ${muted}`}>Ingestion pipeline</span>
        <span className={muted}>
          <span className="text-emerald-600 dark:text-emerald-400">stored {stats.stored}</span>
          {'  ·  '}
          <span className="text-rose-600 dark:text-rose-400">failed + logged {stats.failed}</span>
        </span>
      </div>

      <div className="relative h-32 select-none">
        {/* Track */}
        <div
          aria-hidden="true"
          className="absolute top-5 h-px bg-gradient-to-r from-emerald-500/20 via-emerald-500/60 to-emerald-500/20"
          style={{ left: `${stageX(0, stages.length)}%`, right: `${100 - stageX(stages.length - 1, stages.length)}%` }}
        />
        {/* Failure lane under Validate */}
        <div
          aria-hidden="true"
          className="absolute top-5 h-[84px] border-l border-dashed border-rose-500/40"
          style={{ left: `${stageX(validateIndex, stages.length)}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-[108px] -translate-x-1/2 font-mono text-[10px] text-rose-600 dark:text-rose-400 whitespace-nowrap"
          style={{ left: `${stageX(validateIndex, stages.length)}%` }}
        >
          dead-letter log
        </span>

        {packets.map((p) => (
          <Packet key={p.id} fails={p.fails} count={stages.length} validateIndex={validateIndex} onDone={() => finish(p)} />
        ))}

        {/* Stages */}
        {stages.map((stage, i) => {
          const Icon = icons[stage.icon] || Database;
          const isSelected = selected === i;
          return (
            <div
              key={stage.label}
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center z-10"
              style={{ left: `${stageX(i, stages.length)}%` }}
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setSelected(isSelected ? null : i)}
                aria-pressed={isSelected}
                aria-label={`${stage.label} stage`}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  isSelected
                    ? 'bg-emerald-700 border-emerald-700 text-white shadow-lg shadow-emerald-700/40'
                    : 'bg-white dark:bg-stone-900 border-emerald-500/60 text-emerald-700 dark:text-emerald-400 hover:border-emerald-500'
                }`}
              >
                <Icon size={18} aria-hidden="true" />
              </motion.button>
              <span className={`mt-1.5 text-[10px] sm:text-xs font-mono ${isSelected ? 'text-emerald-700 dark:text-emerald-400' : muted}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="min-h-[3rem] mt-2" aria-live="polite">
        <AnimatePresence mode="wait">
          {active ? (
            <motion.p
              key={active.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-sm"
            >
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">{active.label}: </span>
              <span className={muted}>{active.description}</span>
              <span className={`block mt-1 text-xs font-mono ${muted}`}>Paused. Click the stage again to resume.</span>
            </motion.p>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`text-xs font-mono ${muted}`}>
              Click a stage to see what it does. Red packets fail validation and are logged, never dropped silently.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PipelineDiagram;
