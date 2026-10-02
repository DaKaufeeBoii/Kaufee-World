// ─── UI — LOADING SCREEN ──────────────────────────────────────────────────────

import { useEffect, useState } from 'react';
import { useWorldStore } from '../state/stores';

const LOAD_STEPS = [
  { key: 'PROJECTS',    dur: 800 },
  { key: 'SYSTEMS',     dur: 600 },
  { key: 'ARCHIVE',     dur: 700 },
  { key: 'EXPERIMENTS', dur: 500 },
];

export function LoadingScreen() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const setWorldReady = useWorldStore((s) => s.setWorldReady);

  useEffect(() => {
    let total = 0;
    LOAD_STEPS.forEach((step, i) => {
      total += step.dur;
      setTimeout(() => {
        // Animate bar
        let p = 0;
        const interval = setInterval(() => {
          p = Math.min(p + 8, 100);
          setProgress((prev) => ({ ...prev, [step.key]: p }));
          if (p >= 100) {
            clearInterval(interval);
            if (i === LOAD_STEPS.length - 1) {
              setTimeout(() => setReady(true), 200);
            }
          }
        }, step.dur / 15);
      }, total - step.dur + i * 50);
    });
  }, []);

  if (entered) return null;

  const handleEnter = () => {
    setEntered(true);
    setWorldReady(true);
  };

  return (
    <div className="loading-screen">
      <div>
        <div className="world-title">KAUFEE WORLD</div>
        <div className="subtitle" style={{ marginTop: 6, textAlign: 'center' }}>
          A world built from things I've built.
        </div>
      </div>

      <div className="loading-bar-group">
        <div style={{ marginBottom: 16, fontSize: 9, letterSpacing: '0.16em', color: '#606060' }}>
          WORLD GENERATION
        </div>
        {LOAD_STEPS.map((step) => (
          <div className="row" key={step.key}>
            <span className="key">{step.key}</span>
            <span className="bar">
              <div className="bar-bg">
                <div
                  className="bar-inner"
                  style={{ width: `${progress[step.key] ?? 0}%` }}
                />
              </div>
            </span>
            <span style={{ fontSize: 10, color: '#505050', width: 24, textAlign: 'right' }}>
              {progress[step.key] === 100 ? '✓' : ''}
            </span>
          </div>
        ))}
      </div>

      {ready && (
        <button className="enter-btn" onClick={handleEnter}>
          ENTER
        </button>
      )}
    </div>
  );
}
