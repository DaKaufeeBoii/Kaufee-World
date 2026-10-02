// ─── PLAYER — DRONE ───────────────────────────────────────────────────────────
// Scout/survey drone aesthetic. Not a toy, not a spaceship.
// Hexagonal body, four arms, blurred propellers, indicator lights.

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { DRONE, CAMERA, PALETTE } from '../../lib/constants';
import { useWorldStore } from '../../state/stores';
import { useKeyboard } from '../../hooks/useInput';

// ─── Drone Geometry (visual only — separate from physics body) ────────────────

export function DroneModel({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const propRef1 = useRef<THREE.Mesh>(null!);
  const propRef2 = useRef<THREE.Mesh>(null!);
  const propRef3 = useRef<THREE.Mesh>(null!);
  const propRef4 = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Spin propellers
    const spd = 25;
    propRef1.current.rotation.y = t * spd;
    propRef2.current.rotation.y = -t * spd;
    propRef3.current.rotation.y = t * spd;
    propRef4.current.rotation.y = -t * spd;
    // Pulsing indicator lights
    if (lightRef.current) {
      lightRef.current.emissiveIntensity = 0.8 + Math.sin(t * 3.0) * 0.3;
    }
  });

  const armPositions: [number, number, number][] = [
    [0.38, 0, 0.38],
    [-0.38, 0, 0.38],
    [0.38, 0, -0.38],
    [-0.38, 0, -0.38],
  ];
  const propRefs = [propRef1, propRef2, propRef3, propRef4];

  return (
    <group ref={groupRef}>
      {/* ── Body — hexagonal prism, slightly flattened ─────────────── */}
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.1, 6]} />
        <meshStandardMaterial color="#2A2A32" roughness={0.55} metalness={0.7} />
      </mesh>
      {/* Body top detail */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.03, 6]} />
        <meshStandardMaterial color="#343440" roughness={0.5} metalness={0.75} />
      </mesh>
      {/* Undercarriage sensor ring */}
      <mesh position={[0, -0.07, 0]}>
        <torusGeometry args={[0.12, 0.018, 5, 12]} />
        <meshStandardMaterial color="#404850" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* ── Arms ───────────────────────────────────────────────────── */}
      {armPositions.map((armPos, i) => {
        const angle = Math.atan2(armPos[2], armPos[0]);
        return (
          <mesh
            key={i}
            position={[armPos[0] * 0.5, 0, armPos[2] * 0.5]}
            rotation={[0, -angle, 0]}
            castShadow
          >
            <boxGeometry args={[0.55, 0.04, 0.04]} />
            <meshStandardMaterial color="#353540" roughness={0.5} metalness={0.75} />
          </mesh>
        );
      })}

      {/* ── Propellers (blurred disc) ──────────────────────────────── */}
      {armPositions.map((armPos, i) => (
        <mesh key={i} ref={propRefs[i]} position={armPos}>
          <cylinderGeometry args={[0.2, 0.2, 0.015, 8]} />
          <meshStandardMaterial
            color="#606870"
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.45}
          />
        </mesh>
      ))}

      {/* ── Forward indicator lights ("eyes") ─────────────────────── */}
      <mesh position={[0.1, 0, 0.24]}>
        <boxGeometry args={[0.05, 0.025, 0.015]} />
        <meshStandardMaterial
          ref={lightRef}
          color={PALETTE.screenBlue}
          emissive={PALETTE.screenBlue}
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-0.1, 0, 0.24]}>
        <boxGeometry args={[0.05, 0.025, 0.015]} />
        <meshStandardMaterial
          color={PALETTE.screenBlue}
          emissive={PALETTE.screenBlue}
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* ── Side indicator strips ──────────────────────────────────── */}
      {[-0.22, 0.22].map((x, i) => (
        <mesh key={i} position={[x, 0.02, 0]}>
          <boxGeometry args={[0.04, 0.02, 0.18]} />
          <meshStandardMaterial
            color={PALETTE.lampAmber}
            emissive={PALETTE.lampAmber}
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Drone Controller (physics + movement) ────────────────────────────────────

export function DroneController() {
  const keys = useKeyboard();
  const droneRef = useRef<THREE.Group>(null!);
  const visualRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();
  const setDronePosition = useWorldStore((s) => s.setDronePosition);
  const cameraMode = useWorldStore((s) => s.cameraMode);

  // Velocity for smooth movement
  const vel = useRef(new THREE.Vector3());
  const cameraAngleRef = useRef(0); // horizontal camera rotation

  // Mouse look
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cameraMode !== 'explore') return;
      cameraAngleRef.current -= e.movementX * 0.003;
    };
    const onPointerLock = () => {
      document.addEventListener('mousemove', onMouseMove);
    };
    const onPointerUnlock = () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
    document.addEventListener('pointerlockchange', () => {
      if (document.pointerLockElement) onPointerLock();
      else onPointerUnlock();
    });
    const canvas = document.querySelector('canvas');
    canvas?.addEventListener('click', () => canvas.requestPointerLock());
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [cameraMode]);

  useFrame((_, delta) => {
    if (!droneRef.current || cameraMode !== 'explore') return;

    const k = keys.current;
    const boost = k.boost ? DRONE.boostMultiplier : 1;
    const spd = DRONE.speed * boost;

    // Movement direction relative to camera angle
    const camAngle = cameraAngleRef.current;
    const fwd = new THREE.Vector3(-Math.sin(camAngle), 0, -Math.cos(camAngle));
    const right = new THREE.Vector3(Math.cos(camAngle), 0, -Math.sin(camAngle));

    const inputDir = new THREE.Vector3();
    if (k.forward) inputDir.addScaledVector(fwd, 1);
    if (k.backward) inputDir.addScaledVector(fwd, -1);
    if (k.left) inputDir.addScaledVector(right, -1);
    if (k.right) inputDir.addScaledVector(right, 1);
    if (inputDir.length() > 0) inputDir.normalize();

    // Smooth velocity
    vel.current.lerp(inputDir.multiplyScalar(spd), 0.12);
    droneRef.current.position.addScaledVector(vel.current, delta);

    // Hover oscillation
    const t = performance.now() / 1000;
    droneRef.current.position.y = DRONE.height + Math.sin(t * DRONE.hoverFrequency) * DRONE.hoverAmplitude;

    // Drone facing (toward movement)
    if (vel.current.length() > 0.2) {
      const targetAngle = Math.atan2(vel.current.x, vel.current.z);
      droneRef.current.rotation.y = THREE.MathUtils.lerp(
        droneRef.current.rotation.y, targetAngle, 0.12
      );
    }

    // Drone tilt (pitch/roll based on movement)
    if (visualRef.current) {
      const movingFwd = vel.current.dot(fwd);
      const movingRight = vel.current.dot(right);
      visualRef.current.rotation.x = THREE.MathUtils.lerp(
        visualRef.current.rotation.x, -movingFwd * DRONE.tiltAmount / spd, 0.1
      );
      visualRef.current.rotation.z = THREE.MathUtils.lerp(
        visualRef.current.rotation.z, -movingRight * DRONE.rollAmount / spd, 0.1
      );
    }

    // Update global position store
    const p = droneRef.current.position;
    setDronePosition([p.x, p.y, p.z]);

    // ── Camera follow ────────────────────────────────────────────────
    const targetCamPos = new THREE.Vector3(
      p.x + Math.sin(camAngle) * CAMERA.followDistance,
      p.y + CAMERA.followHeight,
      p.z + Math.cos(camAngle) * CAMERA.followDistance
    );
    camera.position.lerp(targetCamPos, CAMERA.followLag);
    camera.lookAt(p.x, p.y + 0.5, p.z);
  });

  return (
    <group ref={droneRef} position={[0, DRONE.height, 0]}>
      <group ref={visualRef}>
        <DroneModel groupRef={useRef<THREE.Group>(null!)} />
      </group>
    </group>
  );
}
