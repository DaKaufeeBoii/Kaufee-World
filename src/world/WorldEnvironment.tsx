// ─── WORLD — ENVIRONMENT (Terrain, ground materials, fog, global geometry) ────
// Phase 1: Terrain & Ground — before any buildings are placed.

import { useMemo } from 'react';
import { PALETTE } from '../lib/constants';

// ─── Flagstone ground tile ────────────────────────────────────────────────────
// Procedurally offset tiles create visual interest without texture files.

function FlagstoneGround({ cx = 0, cz = 0, w = 16, d = 16, color = PALETTE.groundBase }: {
  cx?: number; cz?: number; w?: number; d?: number; color?: string;
}) {
  const tiles = useMemo(() => {
    const items: { x: number; z: number; w: number; d: number; y: number }[] = [];
    const cols = Math.floor(w / 2);
    const rows = Math.floor(d / 2);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        const tw = 1.7 + (Math.sin(c * 7.3 + r * 3.1) * 0.25);
        const td = 1.7 + (Math.cos(c * 5.1 + r * 8.7) * 0.25);
        const ty = (Math.sin(c * 3.7 + r * 9.1) * 0.018);
        items.push({
          x: cx - w / 2 + c * 2 + 1 + Math.sin(c * 4.1 + r * 2.3) * 0.12,
          z: cz - d / 2 + r * 2 + 1 + Math.cos(c * 2.9 + r * 5.7) * 0.12,
          w: tw,
          d: td,
          y: ty,
        });
      }
    }
    return items;
  }, [cx, cz, w, d]);

  return (
    <group>
      {tiles.map((t, i) => (
        <mesh key={i} position={[t.x, t.y, t.z]} receiveShadow>
          <boxGeometry args={[t.w - 0.08, 0.12, t.d - 0.08]} />
          <meshStandardMaterial
            color={i % 7 === 0 ? PALETTE.groundDetail : color}
            roughness={0.9 + (i % 5) * 0.02}
            metalness={0.02}
          />
        </mesh>
      ))}
      {/* Grout layer underneath */}
      <mesh position={[cx, -0.07, cz]} receiveShadow>
        <boxGeometry args={[w, 0.06, d]} />
        <meshStandardMaterial color={PALETTE.groundPath} roughness={0.98} metalness={0} />
      </mesh>
    </group>
  );
}

// ─── Path strip ───────────────────────────────────────────────────────────────

function PathStrip({ x1, z1, x2, z2, width = 2.5 }: {
  x1: number; z1: number; x2: number; z2: number; width?: number;
}) {
  const cx = (x1 + x2) / 2;
  const cz = (z1 + z2) / 2;
  const len = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2);
  const angle = Math.atan2(x2 - x1, z2 - z1);

  return (
    <mesh position={[cx, 0.01, cz]} rotation={[0, angle, 0]} receiveShadow>
      <boxGeometry args={[width, 0.08, len]} />
      <meshStandardMaterial color={PALETTE.groundPath} roughness={0.95} metalness={0} />
    </mesh>
  );
}


// ─── Stone Steps ──────────────────────────────────────────────────────────────

function Steps({ x, z, direction, steps = 5, heightPerStep = 0.4, startY = 0 }: {
  x: number; z: number; direction: 'north' | 'south' | 'east' | 'west';
  steps?: number; heightPerStep?: number; startY?: number;
}) {
  const stepDepth = 0.9;
  const stepWidth = 4;

  return (
    <group>
      {Array.from({ length: steps }).map((_, i) => {
        const dy = startY + i * heightPerStep;
        let dx = 0, dz = 0;
        if (direction === 'north') dz = -i * stepDepth;
        if (direction === 'south') dz = i * stepDepth;
        if (direction === 'east') dx = i * stepDepth;
        if (direction === 'west') dx = -i * stepDepth;

        return (
          <mesh key={i} position={[x + dx, dy + heightPerStep / 2, z + dz]} receiveShadow castShadow>
            <boxGeometry args={[
              direction === 'north' || direction === 'south' ? stepWidth : stepDepth,
              heightPerStep,
              direction === 'north' || direction === 'south' ? stepDepth : stepWidth,
            ]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#302E32' : PALETTE.concrete}
              roughness={0.95}
              metalness={0.02}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── WorldEnvironment ─────────────────────────────────────────────────────────

export function WorldEnvironment() {
  return (
    <group>
      {/* ── Background base plane — very large, very dark */}
      <mesh position={[0, -0.25, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[300, 300]} />
        <meshStandardMaterial color="#19191F" roughness={1} metalness={0} />
      </mesh>

      {/* ── CENTRAL PLAZA ───────────────────────────────────────────────── */}
      <FlagstoneGround cx={0} cz={0} w={18} d={18} color={PALETTE.groundBase} />

      {/* ── AI LAB PLATFORM (elevated +2.5) ─────────────────────────────── */}
      <group position={[0, 2.5, 0]}>
        <FlagstoneGround cx={0} cz={-22} w={20} d={20} color="#28282E" />
      </group>
      {/* AI Lab retaining walls */}
      <mesh position={[0, 1.25, -12]} receiveShadow castShadow>
        <boxGeometry args={[22, 2.5, 0.4]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.93} metalness={0.06} />
      </mesh>
      {/* Ramp up to AI Lab */}
      <mesh position={[0, 1.25, -15]} rotation={[0.26, 0, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.18, 6]} />
        <meshStandardMaterial color={PALETTE.groundDetail} roughness={0.92} metalness={0.04} />
      </mesh>

      {/* ── PROJECT CITY (slight rise +0.5) ──────────────────────────────── */}
      <group position={[0, 0.5, 0]}>
        <FlagstoneGround cx={22} cz={0} w={20} d={20} color="#2C2C30" />
      </group>
      {/* Small bridge from plaza to project city */}
      <mesh position={[11, 0.15, 0]} receiveShadow>
        <boxGeometry args={[4, 0.25, 3]} />
        <meshStandardMaterial color={PALETTE.timber} roughness={0.88} metalness={0.05} />
      </mesh>
      {/* Bridge railings */}
      <mesh position={[11, 0.5, -1.3]} castShadow>
        <boxGeometry args={[4, 0.6, 0.1]} />
        <meshStandardMaterial color={PALETTE.metal} roughness={0.7} metalness={0.5} />
      </mesh>
      <mesh position={[11, 0.5, 1.3]} castShadow>
        <boxGeometry args={[4, 0.6, 0.1]} />
        <meshStandardMaterial color={PALETTE.metal} roughness={0.7} metalness={0.5} />
      </mesh>

      {/* ── ARCHIVE (sunken -2.0) ────────────────────────────────────────── */}
      <group position={[0, -2.0, 0]}>
        <FlagstoneGround cx={0} cz={22} w={20} d={20} color="#242428" />
      </group>
      {/* Archive stone steps down */}
      <Steps x={0} z={12} direction="south" steps={6} heightPerStep={0.35} startY={-0.35} />
      {/* Archive entry arch base */}
      <mesh position={[-2, -0.5, 12.5]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.94} metalness={0.03} />
      </mesh>
      <mesh position={[2, -0.5, 12.5]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.94} metalness={0.03} />
      </mesh>
      <mesh position={[0, 1.2, 12.5]} receiveShadow>
        <boxGeometry args={[4.5, 0.4, 0.5]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.94} metalness={0.03} />
      </mesh>

      {/* ── ARCADE (ground level, slightly enclosed) ─────────────────────── */}
      <FlagstoneGround cx={-22} cz={0} w={18} d={18} color="#242428" />
      {/* Narrow alley from plaza to arcade */}
      <PathStrip x1={-9} z1={0} x2={-14} z2={0} width={3} />

      {/* ── CONNECTING PATHS ────────────────────────────────────────────── */}
      {/* Plaza → AI Lab */}
      <PathStrip x1={0} z1={-9} x2={0} z2={-14} width={3.5} />
      {/* Plaza → Project City */}
      <PathStrip x1={9} z1={0} x2={14} z2={0} width={3.5} />
      {/* Plaza → Archive */}
      <PathStrip x1={0} z1={9} x2={0} z2={14} width={3.5} />

      {/* ── PERIMETER WALLS (natural boundary, not a box enclosure) ──────── */}
      {/* AI Lab compound wall */}
      <mesh position={[-10, 3.7, -22]} castShadow receiveShadow>
        <boxGeometry args={[0.35, 2.5, 22]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.95} metalness={0.04} />
      </mesh>
      <mesh position={[10, 3.7, -22]} castShadow receiveShadow>
        <boxGeometry args={[0.35, 2.5, 22]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.95} metalness={0.04} />
      </mesh>
      <mesh position={[0, 3.7, -32]} castShadow receiveShadow>
        <boxGeometry args={[20, 2.5, 0.35]} />
        <meshStandardMaterial color={PALETTE.concrete} roughness={0.95} metalness={0.04} />
      </mesh>
    </group>
  );
}
