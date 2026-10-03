import { PROJECTS, TIMELINE } from './index';

export interface WorldInteraction {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
}

export const WORLD_INTERACTIONS: WorldInteraction[] = [
  { id: 'builder', label: 'Talk to the Builder', description: 'The Builder can point you toward each district and share the story behind this world.', position: [-1.5, 0, -3.5] },
  ...PROJECTS.map((project) => ({
    id: project.id,
    label: `Inspect ${project.name}`,
    description: project.shortDesc,
    position: project.districtPosition,
  })),
  { id: 'rag-exhibit', label: 'Inspect the RAG pipeline', description: 'Follow the flow from source documents through retrieval and context assembly to a language model.', position: [0, 2.5, -23] },
  { id: 'lab-workstation', label: 'Inspect the AI workstation', description: 'A closer look at the tools and experiments behind the AI Lab.', position: [-6, 2.5, -18] },
  { id: 'arcade-game', label: 'Inspect Kaufee Dodge', description: 'A physics based bumper cart game experiment built to explore real time collision and multiplayer patterns.', position: [-26, 0, -4] },
  ...TIMELINE.map((event) => ({
    id: `timeline-${event.id}`,
    label: `Read ${event.year}: ${event.label}`,
    description: event.description,
    position: [-5.2, -2, event.archivePosition[2]] as [number, number, number],
  })),
  { id: 'archive-machines', label: 'Inspect the retired machines', description: 'Old terminals and early experiments preserved in the Archive.', position: [-7, -2, 20] },
  { id: 'archive-diagnostic', label: 'Read the diagnostic terminal', description: 'A field note on diagnosing a drone power failure.', position: [6, -2, 14] },
];
