// ─── WORLD — ROOT SCENE ───────────────────────────────────────────────────────
// Assembles all districts, lighting, player, and NPCs.

import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useWorldStore } from '../state/stores';
import { PALETTE, WORLD, DISTRICTS } from '../lib/constants';
import { WorldEnvironment } from './WorldEnvironment';
import { WorldLighting } from './WorldLighting';
import { CentralPlaza } from './districts/CentralPlaza';
import { AILab } from './districts/AILab';
import { ProjectCity } from './districts/ProjectCity';
import { Arcade } from './districts/Arcade';
import { Archive } from './districts/Archive';
import { DroneController } from './player/Drone';
import { BuilderNPC } from './characters/BuilderNPC';

// ─── District watcher — detect which district drone is in ────────────────────

function DistrictWatcher() {
  const dronePos = useWorldStore((s) => s.dronePosition);
  const setActiveDistrict = useWorldStore((s) => s.setActiveDistrict);

  useEffect(() => {
    let nearest = 'plaza' as keyof typeof DISTRICTS;
    let minDist = Infinity;
    for (const [id, d] of Object.entries(DISTRICTS)) {
      const dx = dronePos[0] - d.center[0];
      const dz = dronePos[2] - d.center[1];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDist) {
        minDist = dist;
        nearest = id as keyof typeof DISTRICTS;
      }
    }
    setActiveDistrict(nearest);
  }, [dronePos, setActiveDistrict]);

  return null;
}

// ─── World Scene (inside Canvas) ─────────────────────────────────────────────

function WorldScene() {
  return (
    <>
      {/* Atmosphere */}
      <fog attach="fog" args={[PALETTE.fogColor, WORLD.fogNear, WORLD.fogFar]} />

      {/* Lighting */}
      <WorldLighting />

      {/* Ground + Terrain */}
      <WorldEnvironment />

      {/* Districts */}
      <CentralPlaza />
      <AILab />
      <ProjectCity />
      <Arcade />
      <Archive />

      {/* Characters */}
      <BuilderNPC position={[-1.5, 0, -3.5]} />

      {/* Player */}
      <DroneController />

      {/* District detection */}
      <DistrictWatcher />
    </>
  );
}

// ─── World (Canvas wrapper) ───────────────────────────────────────────────────

export function World() {
  return (
    <Canvas
      camera={{
        fov: 65,
        near: 0.1,
        far: 120,
        position: [0, 10, 12],
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      shadows={false}
      style={{ background: PALETTE.skyNight }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = false;
      }}
    >
      <Suspense fallback={null}>
        <WorldScene />
      </Suspense>
    </Canvas>
  );
}
