import type { Revision } from '@/types/revision.types';

export interface RevisionListItem extends Revision {
  projectName: string;
  disciplineName: string;
  modelName: string;
}
