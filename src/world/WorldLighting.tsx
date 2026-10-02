// ─── WORLD — LIGHTING ─────────────────────────────────────────────────────────
// Authored per the Art Direction document.
// Two-temperature system: warm amber (human/work) + cool blue-white (data/screens)
// NO global shadow maps — only drone shadow from single directional.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE } from '../lib/constants';

export function WorldLighting() {
  const moonRef = useRef<THREE.DirectionalLight>(null!);

  // Very subtle atmospheric drift
  useFrame(({ clock }) => {
    if (moonRef.current) {
      const t = clock.elapsedTime * 0.05;
      moonRef.current.position.x = Math.sin(t) * 60;
      moonRef.current.position.z = Math.cos(t) * 60;
    }
  });

  return (
    <>
      {/* ── Ambient — very low night sky */}
      <ambientLight color="#1A1E2C" intensity={0.35} />

      {/* ── Moonlight / sky directional — dim, cool, almost shadowless */}
      <directionalLight
        ref={moonRef}
        color="#B0C0D8"
        intensity={0.18}
        position={[40, 60, 30]}
        castShadow={false}
      />

      {/* ── Hemisphere — ground warmth vs sky cool */}
      <hemisphereLight
        args={['#1A1E2C', '#2A2010', 0.25]}
      />

      {/* ─── CENTRAL PLAZA ────────────────────────────────────────────────── */}
      {/* Primary courtyard overhead lamp */}
      <pointLight
        color={PALETTE.lampAmber}
        intensity={28}
        distance={14}
        decay={2}
        position={[0, 5.5, 0]}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-radius={4}
        shadow-bias={-0.001}
      />
      {/* Secondary fill — softer spread */}
      <pointLight
        color="#E8C870"
        intensity={12}
        distance={20}
        decay={2}
        position={[3, 3, -3]}
        castShadow={false}
      />
      {/* Path lamp posts contribution */}
      <pointLight color={PALETTE.lampSecondary} intensity={8} distance={8} decay={2} position={[-6, 2.8, 0]} />
      <pointLight color={PALETTE.lampSecondary} intensity={8} distance={8} decay={2} position={[6, 2.8, 0]} />
      <pointLight color={PALETTE.lampSecondary} intensity={8} distance={8} decay={2} position={[0, 2.8, 6]} />
      <pointLight color={PALETTE.lampSecondary} intensity={8} distance={8} decay={2} position={[0, 2.8, -6]} />

      {/* ─── AI LAB ───────────────────────────────────────────────────────── */}
      {/* Cool work light overhead */}
      <pointLight
        color={PALETTE.screenBlue}
        intensity={18}
        distance={16}
        decay={2}
        position={[0, 7, -22]}
        castShadow={false}
      />
      {/* Terminal screen glow fill */}
      <pointLight color="#A0D8FF" intensity={10} distance={10} decay={2} position={[-3, 2, -22]} />
      <pointLight color="#90C8EF" intensity={8} distance={8} decay={2} position={[3, 2, -22]} />
      {/* Warm work lamp — human presence */}
      <pointLight color="#F0C860" intensity={12} distance={10} decay={2} position={[0, 3, -20]} />

      {/* ─── PROJECT CITY ─────────────────────────────────────────────────── */}
      {/* String lights overhead — warm creative energy */}
      <pointLight color="#FFB860" intensity={10} distance={12} decay={2} position={[22, 4, -4]} />
      <pointLight color="#FFC870" intensity={10} distance={12} decay={2} position={[22, 4, 0]} />
      <pointLight color="#FFB850" intensity={10} distance={12} decay={2} position={[22, 4, 5]} />
      {/* Studio window spill */}
      <pointLight color={PALETTE.projectCityAccent} intensity={14} distance={10} decay={2} position={[26, 2, -4]} />
      <pointLight color={PALETTE.screenBlue} intensity={10} distance={8} decay={2} position={[18, 2, 2]} />

      {/* ─── ARCADE ───────────────────────────────────────────────────────── */}
      {/* Bare overhead bulb */}
      <pointLight
        color="#FFD090"
        intensity={16}
        distance={12}
        decay={2}
        position={[-22, 4, 0]}
        castShadow={false}
      />
      {/* Cabinet screen glow */}
      <pointLight color="#FF8060" intensity={14} distance={8} decay={2} position={[-26, 1.5, -4]} />
      <pointLight color="#60C0FF" intensity={10} distance={8} decay={2} position={[-24, 1.5, 0]} />
      <pointLight color="#80FF80" intensity={8} distance={6} decay={2} position={[-22, 1.5, 4]} />

      {/* ─── ARCHIVE ──────────────────────────────────────────────────────── */}
      {/* Warm reading lamps, low */}
      <pointLight color={PALETTE.archiveAccent} intensity={12} distance={10} decay={2} position={[-4, -0.5, 22]} />
      <pointLight color={PALETTE.archiveAccent} intensity={10} distance={8} decay={2} position={[4, -0.5, 22]} />
      <pointLight color="#C09050" intensity={8} distance={12} decay={2} position={[0, 1, 20]} />
      {/* Dim strip overhead — barely there */}
      <pointLight color="#6080A0" intensity={4} distance={20} decay={2} position={[0, 3, 22]} />
    </>
  );
}
