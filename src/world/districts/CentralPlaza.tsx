// ─── DISTRICT — CENTRAL PLAZA ─────────────────────────────────────────────────
// The orientation hub. One tree, one lamp, a bench, signpost, and the Builder.

import {
  CourtyardTree, LampPost, HangingLamp, Bench,
  SignPost, WallShrub, GroundCover, WallPanel, PipeRailing,
} from '../EnvironmentKit';
import { PALETTE } from '../../lib/constants';

export function CentralPlaza() {
  return (
    <group>
      {/* ── THE COURTYARD TREE (landmark) ──────────────────────────── */}
      <CourtyardTree position={[-2.5, 0, -2]} />
      <GroundCover position={[-2.5, 0.01, -2]} />
      <GroundCover position={[-3.5, 0.01, -1.5]} />
      <GroundCover position={[-1.8, 0.01, -3]} />

      {/* ── OVERHEAD HANGING LAMP (key light physical source) ───────── */}
      <HangingLamp position={[0, 5.5, 0]} />
      {/* Cable support posts */}
      <mesh position={[-5, 4.2, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 8.4, 6]} />
        <meshStandardMaterial color="#3A3A40" roughness={0.7} metalness={0.5} />
      </mesh>
      <mesh position={[5, 4.2, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 8.4, 6]} />
        <meshStandardMaterial color="#3A3A40" roughness={0.7} metalness={0.5} />
      </mesh>
      {/* The cable itself */}
      <mesh position={[0, 5.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 10.2, 4]} />
        <meshStandardMaterial color="#202024" roughness={0.9} metalness={0.3} />
      </mesh>

      {/* ── LAMP POSTS at district entries ─────────────────────────── */}
      <LampPost position={[-5.5, 0, 0]} />
      <LampPost position={[5.5, 0, 0]} />
      <LampPost position={[0, 0, 5.5]} />
      <LampPost position={[0, 0, -5.5]} />

      {/* ── DIRECTIONAL SIGNPOST ─────────────────────────────────────── */}
      <SignPost position={[3.5, 0, 2.5]} />

      {/* ── BENCH near the tree ─────────────────────────────────────── */}
      <Bench position={[-0.5, 0, -4.5]} rotation={Math.PI * 0.2} />

      {/* ── LOW PERIMETER WALLS + VEGETATION CORNERS ─────────────────── */}
      {/* South-west corner wall segment */}
      <WallPanel position={[-7.5, 0.4, 5]} w={3} h={0.8} d={0.35} color={PALETTE.concrete} />
      <WallShrub position={[-6.5, 0.4, 5.5]} />

      {/* North-east corner */}
      <WallPanel position={[7, 0.4, -6]} w={0.35} h={0.8} d={3} color={PALETTE.concrete} />
      <WallShrub position={[7.5, 0.4, -4.5]} />

      {/* ── PATH RAILINGS at Archive descent ─────────────────────────── */}
      <PipeRailing
        from={[-2, 0, 9]}
        to={[-2, 0, 13]}
        height={0.85}
      />
      <PipeRailing
        from={[2, 0, 9]}
        to={[2, 0, 13]}
        height={0.85}
      />

      {/* ── GROUND COVER clusters at edges ───────────────────────────── */}
      <GroundCover position={[6, 0.01, 5]} />
      <GroundCover position={[-6, 0.01, -5]} />
      <GroundCover position={[5, 0.01, -6]} />
    </group>
  );
}
