export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  status: ProjectStatus;
  startDate: string;
  expectedEndDate: string;
}

export type ProjectStatus = 'IN_PROGRESS' | 'IN_REVIEW' | 'FINISHED';
