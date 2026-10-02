// ─── STATE — WORLD STORE ──────────────────────────────────────────────────────
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DistrictId } from '../lib/constants';
import type { Achievement } from '../data';

interface WorldState {
  // Active district
  activeDistrict: DistrictId;
  setActiveDistrict: (id: DistrictId) => void;

  // Camera mode
  cameraMode: 'explore' | 'inspect' | 'map' | 'cinematic';
  setCameraMode: (mode: WorldState['cameraMode']) => void;

  // Inspection target
  inspectTarget: string | null;
  setInspectTarget: (id: string | null) => void;

  // Drone position (shared for camera)
  dronePosition: [number, number, number];
  setDronePosition: (pos: [number, number, number]) => void;

  // UI panel
  openPanelId: string | null;
  setOpenPanelId: (id: string | null) => void;

  // Pause
  isPaused: boolean;
  setIsPaused: (v: boolean) => void;

  // Map toggle
  isMapOpen: boolean;
  setIsMapOpen: (v: boolean) => void;

  // Loaded
  worldReady: boolean;
  setWorldReady: (v: boolean) => void;

  // Builder NPC
  builderMet: boolean;
  setBuilderMet: () => void;
}

export const useWorldStore = create<WorldState>()((set) => ({
  activeDistrict: 'plaza',
  setActiveDistrict: (id) => set({ activeDistrict: id }),

  cameraMode: 'explore',
  setCameraMode: (mode) => set({ cameraMode: mode }),

  inspectTarget: null,
  setInspectTarget: (id) => set({ inspectTarget: id }),

  dronePosition: [0, 0.9, 0],
  setDronePosition: (pos) => set({ dronePosition: pos }),

  openPanelId: null,
  setOpenPanelId: (id) => set({ openPanelId: id }),

  isPaused: false,
  setIsPaused: (v) => set({ isPaused: v }),

  isMapOpen: false,
  setIsMapOpen: (v) => set({ isMapOpen: v }),

  worldReady: false,
  setWorldReady: (v) => set({ worldReady: v }),

  builderMet: false,
  setBuilderMet: () => set({ builderMet: true }),
}));

// ─── STATE — DISCOVERY / ACHIEVEMENT STORE (persisted) ───────────────────────

interface DiscoveryState {
  discovered: Set<string>;
  unlockedAchievements: Achievement['id'][];
  addDiscovery: (key: string) => void;
  unlockAchievement: (id: Achievement['id']) => void;
  hasDiscovered: (key: string) => boolean;
  hasAchievement: (id: Achievement['id']) => boolean;
  projectsInspected: number;
  incrementProjectsInspected: () => void;
}

// Use persist but serialize Set as array
export const useDiscoveryStore = create<DiscoveryState>()(
  persist(
    (set, get) => ({
      discovered: new Set<string>(),
      unlockedAchievements: [],
      projectsInspected: 0,

      addDiscovery: (key) =>
        set((s) => ({
          discovered: new Set([...s.discovered, key]),
        })),

      unlockAchievement: (id) =>
        set((s) => ({
          unlockedAchievements: s.unlockedAchievements.includes(id)
            ? s.unlockedAchievements
            : [...s.unlockedAchievements, id],
        })),

      hasDiscovered: (key) => get().discovered.has(key),
      hasAchievement: (id) => get().unlockedAchievements.includes(id),

      incrementProjectsInspected: () =>
        set((s) => ({ projectsInspected: s.projectsInspected + 1 })),
    }),
    {
      name: 'kaufee-world-discoveries',
      // Serialize Set → array
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          if (parsed?.state?.discovered) {
            parsed.state.discovered = new Set(parsed.state.discovered);
          }
          return parsed;
        },
        setItem: (name, value) => {
          const serialized = {
            ...value,
            state: {
              ...value.state,
              discovered: [...value.state.discovered],
            },
          };
          localStorage.setItem(name, JSON.stringify(serialized));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// ─── STATE — UI STORE ─────────────────────────────────────────────────────────

interface UIState {
  // Achievement toast queue
  toastQueue: Array<{ id: string; title: string; description: string; icon: string }>;
  pushToast: (t: UIState['toastQueue'][number]) => void;
  popToast: () => void;

  // Interaction hint
  interactionHint: { label: string; type: string } | null;
  setInteractionHint: (h: UIState['interactionHint']) => void;

  // Recruiter mode
  recruiterModeOpen: boolean;
  setRecruiterModeOpen: (v: boolean) => void;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;

  // Loading
  loadingProgress: number;
  setLoadingProgress: (n: number) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  toastQueue: [],
  pushToast: (t) => set((s) => ({ toastQueue: [...s.toastQueue, t] })),
  popToast: () => set((s) => ({ toastQueue: s.toastQueue.slice(1) })),

  interactionHint: null,
  setInteractionHint: (h) => set({ interactionHint: h }),

  recruiterModeOpen: false,
  setRecruiterModeOpen: (v) => set({ recruiterModeOpen: v }),

  soundEnabled: false,
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),

  loadingProgress: 0,
  setLoadingProgress: (n) => set({ loadingProgress: n }),
}));
