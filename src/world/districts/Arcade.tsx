// ─── DISTRICT — ARCADE ────────────────────────────────────────────────────────
// Small independent arcade. Warm. Slightly chaotic. Personal.
// Accessed through a narrow alley — sound before sight.

import { WallPanel, ArcadeCabinet, LampPost, Window } from '../EnvironmentKit';
import { PALETTE } from '../../lib/constants';

export function Arcade() {
  const Y = 0;

  return (
    <group>
      {/* ── Building envelope ──────────────────────────────────────── */}
      {/* Back wall */}
      <WallPanel position={[-22, Y + 2.0, -9]} w={18} h={4} d={0.4} color="#242428" />
      {/* Side walls */}
      <WallPanel position={[-30, Y + 2.0, -2]} w={0.4} h={4} d={14} color="#262628" />
      <WallPanel position={[-14, Y + 2.0, -2]} w={0.4} h={4} d={14} color="#262628" />
      {/* Roof */}
      <WallPanel position={[-22, Y + 4.05, -2]} w={18.5} h={0.12} d={14.5} color="#1C1C1E" />

      {/* Entrance alley walls (narrow passage from plaza) */}
      <WallPanel position={[-10.5, Y + 1.5, 0]} w={2} h={3} d={0.3} color="#2A2A2E" />
      <WallPanel position={[-13.5, Y + 1.5, 0]} w={2} h={3} d={0.3} color="#2A2A2E" />
      <WallPanel position={[-10.5, Y + 1.5, -1]} w={0.3} h={3} d={2} color="#2A2A2E" />
      <WallPanel position={[-13.5, Y + 1.5, -1]} w={0.3} h={3} d={2} color="#2A2A2E" />

      {/* ── Bare overhead bulb ──────────────────────────────────────── */}
      {/* Physical bulb geometry at -22, 3.6, -2 */}
      <mesh position={[-22, 3.65, -2]}>
        <sphereGeometry args={[0.12, 7, 7]} />
        <meshStandardMaterial
          color="#FFD090"
          emissive="#FFD090"
          emissiveIntensity={2.0}
          roughness={0.2}
          metalness={0}
        />
      </mesh>
      {/* Hanging wire */}
      <mesh position={[-22, 3.85, -2]}>
        <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
        <meshStandardMaterial color="#202022" roughness={0.9} metalness={0.3} />
      </mesh>

      {/* ── ARCADE CABINETS ─────────────────────────────────────────── */}
      {/* Main playable: Kaufee Dodge */}
      <ArcadeCabinet
        position={[-26, Y + 0.95, -4]}
        rotation={Math.PI / 6}
        screenColor="#FF6040"
        isPlayable={true}
      />

      {/* Secondary — broken/dark machine */}
      <group position={[-24, Y + 0.95, 0]} rotation={[0, -0.3, 0]}>
        <ArcadeCabinet position={[0, 0, 0]} rotation={0} screenColor="#202020" />
        {/* Tape over coin slot */}
        <mesh position={[0, -0.4, 0.33]} rotation={[-0.2, 0, 0.1]}>
          <boxGeometry args={[0.25, 0.06, 0.02]} />
          <meshStandardMaterial color="#F0D040" roughness={0.7} metalness={0.0} />
        </mesh>
      </group>

      {/* Third cabinet — retro console */}
      <ArcadeCabinet
        position={[-19, Y + 0.95, -5]}
        rotation={-Math.PI / 4}
        screenColor="#60D060"
      />

      {/* Small retro TV on table */}
      <group position={[-28, Y, -7]}>
        {/* Table */}
        <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.08, 0.7]} />
          <meshStandardMaterial color={PALETTE.timber} roughness={0.9} metalness={0.04} />
        </mesh>
        {/* TV body — rounded boxy */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[0.6, 0.5, 0.45]} />
          <meshStandardMaterial color="#181818" roughness={0.8} metalness={0.3} />
        </mesh>
        {/* CRT screen */}
        <mesh position={[0, 0.76, 0.23]}>
          <boxGeometry args={[0.45, 0.36, 0.04]} />
          <meshStandardMaterial color="#40FF40" emissive="#40FF40" emissiveIntensity={0.5} roughness={0.2} />
        </mesh>
        {/* Antenna */}
        <mesh position={[0.1, 1.1, 0]} rotation={[0.1, 0, 0.4]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
          <meshStandardMaterial color="#404040" roughness={0.8} metalness={0.5} />
        </mesh>
        <mesh position={[-0.1, 1.1, 0]} rotation={[0.1, 0, -0.4]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
          <meshStandardMaterial color="#404040" roughness={0.8} metalness={0.5} />
        </mesh>
      </group>

      {/* ── High score display on wall ──────────────────────────────── */}
      <mesh position={[-22, Y + 2.8, -8.8]}>
        <boxGeometry args={[3.5, 1.2, 0.06]} />
        <meshStandardMaterial color="#FF6040" emissive="#FF6040" emissiveIntensity={0.35} roughness={0.4} />
      </mesh>

      {/* ── Trophy/medal on shelf ────────────────────────────────────── */}
      <group position={[-17, Y, -7]}>
        {/* Shelf */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <boxGeometry args={[0.8, 0.06, 0.28]} />
          <meshStandardMaterial color={PALETTE.timber} roughness={0.88} metalness={0.04} />
        </mesh>
        {/* Trophy cup */}
        <mesh position={[0, 1.45, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.06, 0.25, 7]} />
          <meshStandardMaterial color="#D0A020" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.62, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.08, 7]} />
          <meshStandardMaterial color="#D0A020" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* ── Brick-like wall detail (rough material variation) ────────── */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i}
          position={[-30.18, Y + 0.4 + i * 0.42, -2 + (i % 3) * 1.5]}
          receiveShadow>
          <boxGeometry args={[0.06, 0.32, 0.9]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#2C2830' : '#242028'}
            roughness={0.97}
            metalness={0.02}
          />
        </mesh>
      ))}

      {/* ── Game poster planes on walls ──────────────────────────────── */}
      {[
        { pos: [-22, Y + 2.5, -8.75] as [number,number,number], color: '#D04030' },
        { pos: [-19, Y + 2.5, -8.75] as [number,number,number], color: '#3080D0' },
        { pos: [-25, Y + 2.5, -8.75] as [number,number,number], color: '#30B060' },
      ].map((p, i) => (
        <mesh key={i} position={p.pos} castShadow>
          <boxGeometry args={[1.4, 2.0, 0.04]} />
          <meshStandardMaterial color={p.color} roughness={0.85} metalness={0.04} />
        </mesh>
      ))}

      {/* ── Entry lamp post pair ─────────────────────────────────────── */}
      <LampPost position={[-14.5, Y, 3]} emissiveIntensity={1.2} />
      <LampPost position={[-14.5, Y, -3]} emissiveIntensity={1.2} />

      {/* ── Side window (exterior glow from inside) ──────────────────── */}
      <Window position={[-30.2, Y + 1.8, -4]} w={1.2} h={0.9} emissive="#FFD080"
        rotation={[0, Math.PI / 2, 0]} />
    </group>
  );
}
