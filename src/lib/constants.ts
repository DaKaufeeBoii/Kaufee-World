// ─── KAUFEE WORLD — GLOBAL CONSTANTS ──────────────────────────────────────────

// World palette (from Art Direction document — brightened for clarity)
export const PALETTE = {
  // Ground / Concrete
  groundBase: '#36373E',
  groundDetail: '#464852',
  groundPath: '#27282F',

  // Warm lights
  lampAmber: '#F7D688',
  lampSecondary: '#ECC874',
  screenBlue: '#9FD6FF',
  dataGreen: '#ADEEC9',

  // Vegetation
  foliageDark: '#548864',
  foliageLight: '#78AC77',
  bark: '#6E5946',
  groundCover: '#496B46',

  // Architecture
  concrete: '#484852',
  concretLight: '#5A5A66',
  timber: '#7B6A50',
  metal: '#8E8E9E',
  rust: '#996444',

  // District accents
  plazaAccent: '#FAD88F',
  aiLabAccent: '#95D5FF',
  projectCityAccent: '#F5A95A',
  arcadeAccent: '#F0B86A',
  archiveAccent: '#DEA868',

  // Sky / Fog
  skyNight: '#151928',
  fogColor: '#1A1E30',

  // UI
  uiBg: 'rgba(18,20,26,0.92)',
  uiText: '#F0F0E8',
  uiBorder: '#4A4A58',
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
  interactRadius: 4.5,
  interactHintRadius: 6,

  // Fog
  fogNear: 45,
  fogFar: 110,
} as const;

// Camera
export const CAMERA = {
  // Exploration mode
  followHeight: 3.2,
  followDistance: 6.5,
  followLag: 0.12,
  fov: 65,

  // Map mode
  mapHeight: 45,
  mapFov: 50,

  // Inspection mode
  inspectDuration: 0.8, // seconds (GSAP)
} as const;

// Drone
export const DRONE = {
  speed: 8.5,
  boostMultiplier: 2.0,
  hoverAmplitude: 0.08,
  hoverFrequency: 2.0,
  tiltAmount: 0.14, // radians
  rollAmount: 0.09,
  height: 1.05, // default hover height above ground
  colliderRadius: 0.38,
  visualScale: 0.65,
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
