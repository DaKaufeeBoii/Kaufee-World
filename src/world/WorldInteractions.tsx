import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { WORLD_INTERACTIONS } from '../data/interactions';
import { WORLD } from '../lib/constants';
import { useDiscoveryStore, useUIStore, useWorldStore } from '../state/stores';

export function WorldInteractions() {
  const activeTargetId = useRef<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'KeyE' || event.repeat) return;
      const world = useWorldStore.getState();
      const ui = useUIStore.getState();
      if (!world.worldReady || ui.recruiterModeOpen) return;

      if (world.openPanelId) {
        world.setOpenPanelId(null);
        return;
      }

      const targetId = activeTargetId.current;
      if (!targetId) return;
      world.setOpenPanelId(targetId);
      if (targetId.startsWith('timeline-')) {
        useDiscoveryStore.getState().unlockAchievement('archaeologist');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useFrame(() => {
    const ui = useUIStore.getState();
    const world = useWorldStore.getState();
    const pos = world.dronePosition;
    const panelOpen = Boolean(world.openPanelId) || ui.recruiterModeOpen;
    let nearest: (typeof WORLD_INTERACTIONS)[number] | null = null;
    let nearestDistance: number = WORLD.interactRadius;

    if (world.worldReady && !panelOpen) {
      for (const target of WORLD_INTERACTIONS) {
        const dx = pos[0] - target.position[0];
        const dz = pos[2] - target.position[2];
        const distance = Math.hypot(dx, dz);
        if (distance < nearestDistance) {
          nearest = target;
          nearestDistance = distance;
        }
      }
    }

    const nextId = nearest?.id ?? null;
    if (activeTargetId.current !== nextId) {
      activeTargetId.current = nextId;
      ui.setInteractionHint(nearest ? { label: nearest.label, type: 'INTERACT' } : null);
    }

  });

  return null;
}
