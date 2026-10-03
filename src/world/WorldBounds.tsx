// ─── WORLD — PHYSICAL BOUNDS & COLLIDERS ───────────────────────────────────────
// Robust, high-performance static primitive colliders for districts and boundaries.
// Separating collision shapes from visual render groups eliminates tunneling,
// instanced-mesh collider drops, and trimesh polygon trap glitches.

import { RigidBody, CuboidCollider } from '@react-three/rapier';

export function WorldBounds() {
  return (
    <RigidBody type="fixed" colliders={false}>
      {/* ══════════════════════════════════════════════════════════════════════
          1. DISTRICT GROUND & PLATFORM COLLIDERS
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Central Plaza (Y = 0) */}
      <CuboidCollider position={[0, -0.4, 0]} args={[9.5, 0.4, 9.5]} />

      {/* AI Lab Elevated Platform (Y = 2.5) */}
      <CuboidCollider position={[0, 2.1, -22]} args={[11, 0.4, 11]} />
      {/* AI Lab Access Ramp */}
      <CuboidCollider position={[0, 1.25, -15]} rotation={[0.26, 0, 0]} args={[1.8, 0.2, 3.2]} />
      {/* Retaining Wall below AI Lab */}
      <CuboidCollider position={[0, 1.25, -12]} args={[11, 1.25, 0.25]} />

      {/* Project City Platform (Y = 0.5) */}
      <CuboidCollider position={[22, 0.1, 0]} args={[11, 0.4, 11]} />
      {/* Bridge from Plaza to Project City */}
      <CuboidCollider position={[10.5, 0.05, 0]} args={[2.2, 0.25, 1.6]} />

      {/* Arcade District (Y = 0) */}
      <CuboidCollider position={[-22, -0.4, 0]} args={[10, 0.4, 10]} />
      {/* Alley from Plaza to Arcade */}
      <CuboidCollider position={[-11, -0.4, 0]} args={[2.5, 0.4, 1.6]} />

      {/* Archive Sunken Vault (Y = -2.0) */}
      <CuboidCollider position={[0, -2.4, 22]} args={[11, 0.4, 11]} />
      {/* Archive Descent Ramp / Stairs transition */}
      <CuboidCollider position={[0, -1.0, 11]} rotation={[-0.28, 0, 0]} args={[2.2, 0.25, 3.2]} />

      {/* Connecting paths */}
      <CuboidCollider position={[0, -0.4, -11]} args={[2.0, 0.4, 2.5]} />
      <CuboidCollider position={[0, -0.4, 11]} args={[2.0, 0.4, 2.0]} />

      {/* World bedrock base plane (failsafe floor) */}
      <CuboidCollider position={[0, -4.5, 0]} args={[100, 0.5, 100]} />

      {/* ══════════════════════════════════════════════════════════════════════
          2. WORLD PERIMETER BOUNDARY WALLS (Keeps drone inside map)
         ══════════════════════════════════════════════════════════════════════ */}
      {/* North boundary */}
      <CuboidCollider position={[0, 6, -36]} args={[40, 10, 1]} />
      {/* South boundary */}
      <CuboidCollider position={[0, 6, 36]} args={[40, 10, 1]} />
      {/* East boundary */}
      <CuboidCollider position={[36, 6, 0]} args={[1, 10, 40]} />
      {/* West boundary */}
      <CuboidCollider position={[-36, 6, 0]} args={[1, 10, 40]} />
      {/* Sky ceiling */}
      <CuboidCollider position={[0, 14, 0]} args={[40, 1, 40]} />

      {/* ══════════════════════════════════════════════════════════════════════
          3. DISTRICT ARCHITECTURAL & OBSTACLE COLLIDERS
         ══════════════════════════════════════════════════════════════════════ */}

      {/* ── Central Plaza ── */}
      {/* Courtyard Tree Trunk */}
      <CuboidCollider position={[-2.5, 1.6, -2]} args={[0.4, 1.6, 0.4]} />
      {/* Bench */}
      <CuboidCollider position={[-0.5, 0.35, -4.5]} args={[0.8, 0.35, 0.4]} />
      {/* Corner low walls */}
      <CuboidCollider position={[-7.5, 0.5, 5]} args={[1.6, 0.5, 0.25]} />
      <CuboidCollider position={[7, 0.5, -6]} args={[0.25, 0.5, 1.6]} />
      {/* Archive descent railings */}
      <CuboidCollider position={[-2, 0.5, 11]} args={[0.1, 0.5, 2.2]} />
      <CuboidCollider position={[2, 0.5, 11]} args={[0.1, 0.5, 2.2]} />
      {/* Lamp posts base colliders */}
      <CuboidCollider position={[-5.5, 1.6, 0]} args={[0.2, 1.6, 0.2]} />
      <CuboidCollider position={[5.5, 1.6, 0]} args={[0.2, 1.6, 0.2]} />
      <CuboidCollider position={[0, 1.6, 5.5]} args={[0.2, 1.6, 0.2]} />
      <CuboidCollider position={[0, 1.6, -5.5]} args={[0.2, 1.6, 0.2]} />

      {/* ── AI Lab ── */}
      {/* Compound Back Wall */}
      <CuboidCollider position={[0, 4.0, -32]} args={[10.5, 1.8, 0.3]} />
      {/* Compound Side Walls */}
      <CuboidCollider position={[-10, 4.0, -27]} args={[0.3, 1.8, 5.5]} />
      <CuboidCollider position={[10, 4.0, -27]} args={[0.3, 1.8, 5.5]} />
      {/* Entry Gate Pillars */}
      <CuboidCollider position={[-1.8, 3.7, -12.5]} args={[0.25, 1.4, 0.25]} />
      <CuboidCollider position={[1.8, 3.7, -12.5]} args={[0.25, 1.4, 0.25]} />
      {/* Workstation Desk */}
      <CuboidCollider position={[-6, 3.1, -18]} args={[1.2, 0.6, 0.55]} />
      {/* Server Racks */}
      <CuboidCollider position={[7.5, 3.5, -30]} args={[1.1, 1.0, 0.4]} />
      {/* Central RAG Exhibit */}
      <CuboidCollider position={[0, 3.4, -23]} args={[3.8, 0.9, 0.6]} />

      {/* ── Project City ── */}
      {/* ProjectPulse Studio Main Structure */}
      <CuboidCollider position={[26, 2.4, -4]} args={[2.7, 1.9, 2.2]} />
      {/* KaufeeHome Booth Structure */}
      <CuboidCollider position={[18, 2.0, 2]} args={[1.4, 1.6, 1.3]} />
      {/* BharatVaani Booth */}
      <CuboidCollider position={[22, 2.2, 6.8]} args={[1.2, 1.8, 0.4]} />
      <CuboidCollider position={[21, 1.7, 6.0]} args={[0.3, 1.7, 0.8]} />
      <CuboidCollider position={[23, 1.7, 6.0]} args={[0.3, 1.7, 0.8]} />
      {/* Security booth */}
      <CuboidCollider position={[26, 1.5, 4]} args={[0.8, 1.0, 0.6]} />
      {/* Garage structure */}
      <CuboidCollider position={[28, 1.2, -7]} args={[1.4, 0.7, 1.0]} />

      {/* ── Arcade ── */}
      {/* Building Back Wall */}
      <CuboidCollider position={[-22, 2.0, -9]} args={[9.5, 2.1, 0.3]} />
      {/* Side Walls */}
      <CuboidCollider position={[-30, 2.0, -2]} args={[0.3, 2.1, 7.3]} />
      <CuboidCollider position={[-14, 2.0, -2]} args={[0.3, 2.1, 7.3]} />
      {/* Roof */}
      <CuboidCollider position={[-22, 4.15, -2]} args={[9.5, 0.2, 7.5]} />
      {/* Alley entryway walls */}
      <CuboidCollider position={[-10.5, 1.5, 0]} args={[1.1, 1.5, 0.2]} />
      <CuboidCollider position={[-13.5, 1.5, 0]} args={[1.1, 1.5, 0.2]} />
      {/* Arcade Cabinets */}
      <CuboidCollider position={[-26, 1.0, -4]} args={[0.5, 1.0, 0.5]} />
      <CuboidCollider position={[-24, 1.0, 0]} args={[0.5, 1.0, 0.5]} />
      <CuboidCollider position={[-19, 1.0, -5]} args={[0.5, 1.0, 0.5]} />
      <CuboidCollider position={[-28, 0.9, -7]} args={[0.6, 0.9, 0.5]} />

      {/* ── Archive ── */}
      {/* Vault Back Wall */}
      <CuboidCollider position={[0, -0.1, 32]} args={[11.2, 2.0, 0.3]} />
      {/* Vault Side Walls */}
      <CuboidCollider position={[-11, -0.1, 27]} args={[0.3, 2.0, 5.3]} />
      <CuboidCollider position={[11, -0.1, 27]} args={[0.3, 2.0, 5.3]} />
      {/* Vault Ceiling */}
      <CuboidCollider position={[0, 1.75, 26]} args={[11.2, 0.2, 6.3]} />
      {/* Reading Table and Machines */}
      <CuboidCollider position={[-4, -1.5, 22]} args={[1.1, 0.5, 0.55]} />
      <CuboidCollider position={[-7.5, -1.4, 20]} args={[0.8, 0.7, 2.2]} />

      {/* ── Builder NPC Collision ── */}
      <CuboidCollider position={[-1.5, 0.65, -3.5]} args={[0.35, 0.65, 0.35]} />
    </RigidBody>
  );
}
