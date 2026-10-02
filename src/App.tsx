// ─── APP ROOT ─────────────────────────────────────────────────────────────────

import { useWorldStore } from './state/stores';
import { World } from './world/World';
import { HUD } from './ui/HUD';
import { LoadingScreen } from './ui/LoadingScreen';
import './styles/globals.css';

export default function App() {
  const worldReady = useWorldStore((s) => s.worldReady);

  return (
    <>
      {/* Loading screen — shown until ENTER is pressed */}
      {!worldReady && <LoadingScreen />}

      {/* 3D Canvas always rendered (loads in background) */}
      <World />

      {/* HTML overlay UI */}
      <HUD />
    </>
  );
}
