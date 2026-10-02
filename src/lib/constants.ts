// ─── KAUFEE WORLD — GLOBAL CONSTANTS ──────────────────────────────────────────

// World palette (from Art Direction document)
export const PALETTE = {
  // Ground / Concrete
  groundBase: '#2A2A2E',
  groundDetail: '#3A3A40',
  groundPath: '#1C1C20',

  // Warm lights
  lampAmber: '#F5D58A',
  lampSecondary: '#E8C06A',
  screenBlue: '#8FCFFF',
  dataGreen: '#A0E8C0',

  // Vegetation
  foliageDark: '#4A7C59',
  foliageLight: '#6B9E6A',
  bark: '#5C4A3A',
  groundCover: '#3D5C3A',

  // Architecture
  concrete: '#3C3C42',
  concretLight: '#4A4A52',
  timber: '#6B5C45',
  metal: '#808090',
  rust: '#8B5A3C',

  // District accents
  plazaAccent: '#F5D48A',
  aiLabAccent: '#8FCFFF',
  projectCityAccent: '#F0A050',
  arcadeAccent: '#E8B060',
  archiveAccent: '#D4A060',

  // Sky / Fog
  skyNight: '#0E0E18',
  fogColor: '#1A1A24',

  // UI
  uiBg: 'rgba(16,16,16,0.88)',
  uiText: '#E8E8E0',
  uiBorder: '#404040',
} as const;

// World scale
export const WORLD = {
  // District center positions [x, z]
  plazaCenter: [0, 0] as [number, number],
  aiLabCenter: [0, -22] as [number, number],
  arcadeCenter: [-22, 0] as [number, number],
  projectCityCenter: [22, 0] as [number, number],
  archiveCenter: [0, 22] as [number, number],

  // Elevations
  plazaY: 0,
  aiLabY: 2.5,
  arcadeY: 0,
  projectCityY: 0.5,
  archiveY: -2.0,

  // District trigger radii
  districtTriggerRadius: 10,

  // Interaction radii
  interactRadius: 3.5,
  interactHintRadius: 6,

  // Fog
  fogNear: 30,
  fogFar: 80,
} as const;

// Camera
export const CAMERA = {
  // Exploration mode
  followHeight: 7,
  followDistance: 9,
  followLag: 0.08,
  fov: 65,

  // Map mode
  mapHeight: 45,
  mapFov: 50,

  // Inspection mode
  inspectDuration: 0.8, // seconds (GSAP)
} as const;

// Drone
export const DRONE = {
  speed: 8,
  boostMultiplier: 2.2,
  hoverAmplitude: 0.08,
  hoverFrequency: 2.0,
  tiltAmount: 0.14, // radians
  rollAmount: 0.09,
  height: 0.9, // default hover height above ground
} as const;

// Districts
export type DistrictId = 'plaza' | 'ailab' | 'projectcity' | 'arcade' | 'archive';

export const DISTRICTS: Record<DistrictId, {
  name: string;
  label: string;
  center: [number, number];
  elevation: number;
  accentColor: string;
  triggerRadius: number;
}> = {
  plaza: {
    name: 'plaza',
    label: 'Central Plaza',
    center: [0, 0],
    elevation: 0,
    accentColor: PALETTE.plazaAccent,
    triggerRadius: 12,
  },
  ailab: {
    name: 'ailab',
    label: 'AI Lab',
    center: [0, -22],
    elevation: 2.5,
    accentColor: PALETTE.aiLabAccent,
    triggerRadius: 10,
  },
  projectcity: {
    name: 'projectcity',
    label: 'Project City',
    center: [22, 0],
    elevation: 0.5,
    accentColor: PALETTE.projectCityAccent,
    triggerRadius: 10,
  },
  arcade: {
    name: 'arcade',
    label: 'Arcade',
    center: [-22, 0],
    elevation: 0,
    accentColor: PALETTE.arcadeAccent,
    triggerRadius: 9,
  },
  archive: {
    name: 'archive',
    label: 'Archive',
    center: [0, 22],
    elevation: -2.0,
    accentColor: PALETTE.archiveAccent,
    triggerRadius: 10,
  },
};
