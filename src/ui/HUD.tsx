// ─── UI — HUD LAYER ───────────────────────────────────────────────────────────
// Minimal. Diegetic-first. UI appears when needed, not covering the world.

import { useEffect } from 'react';
import { useUIStore, useWorldStore, useDiscoveryStore } from '../state/stores';
import { DISTRICTS } from '../lib/constants';
import { PROJECTS, SOCIALS, EXPERIENCE } from '../data';

// ─── Interaction Hint ─────────────────────────────────────────────────────────

function InteractionHint() {
  const hint = useUIStore((s) => s.interactionHint);
  if (!hint) return null;

  return (
    <div className="interaction-hint">
      <span style={{ color: '#808080', marginRight: 8 }}>[E]</span>
      {hint.label}
    </div>
  );
}

// ─── Achievement Toast ────────────────────────────────────────────────────────

function AchievementToast() {
  const queue = useUIStore((s) => s.toastQueue);
  const popToast = useUIStore((s) => s.popToast);

  useEffect(() => {
    if (queue.length === 0) return;
    const timer = setTimeout(popToast, 3200);
    return () => clearTimeout(timer);
  }, [queue, popToast]);

  if (queue.length === 0) return null;
  const toast = queue[0];

  return (
    <div className="achievement-toast" key={toast.id}>
      <div className="label">ACHIEVEMENT UNLOCKED</div>
      <div className="icon">{toast.icon}</div>
      <div className="title">{toast.title}</div>
      <div className="desc">{toast.description}</div>
    </div>
  );
}

// ─── District Label ───────────────────────────────────────────────────────────

function DistrictLabel() {
  const activeDistrict = useWorldStore((s) => s.activeDistrict);
  const district = DISTRICTS[activeDistrict];
  return (
    <div className="district-label" key={activeDistrict}>
      {district.label}
    </div>
  );
}

// ─── Controls Hint ────────────────────────────────────────────────────────────

function ControlsHint() {
  const worldReady = useWorldStore((s) => s.worldReady);
  if (!worldReady) return null;
  return (
    <div className="controls-hint">
      <span>WASD — move</span>
      <span>MOUSE — look</span>
      <span>E — interact</span>
      <span>M — map</span>
    </div>
  );
}

// ─── Recruiter Mode Button ────────────────────────────────────────────────────

function RecruiterBtn() {
  const setOpen = useUIStore((s) => s.setRecruiterModeOpen);
  return (
    <button className="recruiter-btn" onClick={() => setOpen(true)}>
      RECRUITER MODE
    </button>
  );
}

// ─── Sound Toggle ─────────────────────────────────────────────────────────────

function SoundBtn() {
  const enabled = useUIStore((s) => s.soundEnabled);
  const toggle = useUIStore((s) => s.toggleSound);
  return (
    <button className="sound-btn" onClick={toggle}>
      {enabled ? '♪ ON' : '♪ OFF'}
    </button>
  );
}

// ─── Project Panel ────────────────────────────────────────────────────────────

function ProjectPanel() {
  const openPanelId = useWorldStore((s) => s.openPanelId);
  const setOpenPanelId = useWorldStore((s) => s.setOpenPanelId);
  const incrementProjectsInspected = useDiscoveryStore((s) => s.incrementProjectsInspected);
  const addDiscovery = useDiscoveryStore((s) => s.addDiscovery);
  const unlockAchievement = useDiscoveryStore((s) => s.unlockAchievement);
  const pushToast = useUIStore((s) => s.pushToast);
  const projectsInspected = useDiscoveryStore((s) => s.projectsInspected);

  if (!openPanelId || openPanelId === 'builder') return null;
  const project = PROJECTS.find((p) => p.id === openPanelId);
  if (!project) return null;

  const handleOpen = () => {
    incrementProjectsInspected();
    addDiscovery(`found_${project.id}`);
    const newCount = projectsInspected + 1;
    if (newCount >= 3) {
      unlockAchievement('system-architect');
      pushToast({ id: 'system-architect', title: 'System Architect', description: 'Inspected three projects.', icon: '⬡' });
    }
    if (project.id === 'kaufeehome') {
      unlockAchievement('local-ai');
      pushToast({ id: 'local-ai', title: 'Local AI', description: 'Discovered Kaufee-Home.', icon: '⬙' });
    }
  };

  return (
    <div className="project-panel" onMouseEnter={handleOpen}>
      <button className="close-btn" onClick={() => setOpenPanelId(null)}>✕</button>
      <div className="category">{project.category}</div>
      <h2>{project.name}</h2>
      <p className="desc">{project.longDesc}</p>

      <div className="section-label">Technology</div>
      <div className="stack">
        {project.stack.map((s) => <span key={s}>{s}</span>)}
      </div>

      <div className="section-label">Highlights</div>
      <ul className="highlights">
        {project.highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>

      <div className="actions">
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn primary">
            LIVE DEMO
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
            GITHUB
          </a>
        )}
        <button className="btn" onClick={() => setOpenPanelId(null)}>CLOSE</button>
      </div>
    </div>
  );
}

// ─── Builder Dialogue Panel ───────────────────────────────────────────────────

const BUILDER_DIALOGUE = [
  {
    text: '"You found me. Everything here is something I\'ve built, broken, rebuilt, or decided was a terrible idea."',
    action: 'CONTINUE',
  },
  {
    text: '"The AI Lab is through the gate up north. Projects are east. Old memories are below. And somewhere in there — an arcade."',
    action: 'EXPLORE',
  },
];

function BuilderDialogue() {
  const openPanelId = useWorldStore((s) => s.openPanelId);
  const setOpenPanelId = useWorldStore((s) => s.setOpenPanelId);
  const [step, setStep] = useState(0);

  if (openPanelId !== 'builder') return null;

  const current = BUILDER_DIALOGUE[step];
  const isLast = step === BUILDER_DIALOGUE.length - 1;

  return (
    <div className="dialogue-panel">
      <div className="speaker">BUILDER</div>
      <div className="text">{current.text}</div>
      <div className="actions">
        {!isLast ? (
          <button className="btn" onClick={() => setStep((s) => s + 1)}>
            {current.action}
          </button>
        ) : (
          <button className="btn" onClick={() => setOpenPanelId(null)}>
            {current.action}
          </button>
        )}
      </div>
    </div>
  );
}

// Need useState import
import { useState } from 'react';

// ─── Recruiter Panel ──────────────────────────────────────────────────────────

function RecruiterPanel() {
  const open = useUIStore((s) => s.recruiterModeOpen);
  const setOpen = useUIStore((s) => s.setRecruiterModeOpen);

  if (!open) return null;

  return (
    <div className="recruiter-panel">
      <button className="close-btn" onClick={() => setOpen(false)}>✕</button>

      <h1>Sai Tarun Reddy Velagala</h1>
      <div className="tagline">AI/ML Engineer · Builder · Student</div>

      <section>
        <div className="section-title">Education</div>
        <div style={{ fontSize: 12, lineHeight: 1.7 }}>
          KG Reddy College of Engineering and Technology<br />
          <span style={{ color: '#808080', fontSize: 11 }}>B.Tech CSE — AI/ML Specialization</span><br />
          <span style={{ color: '#606060', fontSize: 10 }}>Sep 2023 – Present · CGPA 8.49</span>
        </div>
      </section>

      <section>
        <div className="section-title">Experience</div>
        {EXPERIENCE.map((e) => (
          <div key={e.id} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{e.company}</div>
            <div style={{ fontSize: 11, color: '#909090' }}>{e.role}</div>
            <div style={{ fontSize: 10, color: '#606060' }}>{e.period} · {e.location}</div>
            <ul style={{ fontSize: 11, color: '#808080', paddingLeft: 16, marginTop: 6, lineHeight: 1.7 }}>
              {e.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <div className="section-title">Projects</div>
        {PROJECTS.slice(0, 3).map((p) => (
          <div key={p.id} style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: '#908880' }}>{p.shortDesc}</div>
            <div style={{ fontSize: 10, color: '#606060', marginTop: 4 }}>
              {p.stack.join(' · ')}
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="section-title">Skills</div>
        <div style={{ fontSize: 11, color: '#808080', lineHeight: 2 }}>
          Python · SQL · LLM Applications · AI Agents · RAG · NLP ·
          Prompt Engineering · Tool Calling · FastAPI · REST APIs ·
          PostgreSQL · SQLite · Supabase · React · Next.js · Git · Kotlin
        </div>
      </section>

      <section>
        <div className="section-title">Achievements</div>
        <div style={{ fontSize: 11, color: '#808080', lineHeight: 2 }}>
          IKARUS 2024 — First Prize, Inter-College Technical Fest<br />
          Best Student Award 2025, CSE-AIML
        </div>
      </section>

      <div className="links">
        <a className="link-btn" href={SOCIALS.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
        <a className="link-btn" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
      </div>
    </div>
  );
}

// ─── HUD (root) ───────────────────────────────────────────────────────────────

export function HUD() {
  const worldReady = useWorldStore((s) => s.worldReady);
  if (!worldReady) return null;

  return (
    <>
      <DistrictLabel />
      <InteractionHint />
      <AchievementToast />
      <ControlsHint />
      <ProjectPanel />
      <BuilderDialogue />
      <RecruiterPanel />
      <RecruiterBtn />
      <SoundBtn />
    </>
  );
}
