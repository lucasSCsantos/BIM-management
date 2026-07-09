import { faker } from '@faker-js/faker';
import type { Project } from '@/types/project.types';
import type { Document } from '@/types/document.types';

export function createDocument(project: Project, overrides?: Partial<Document>): Document {
  return {
    id: faker.string.uuid(),
    projectId: project.id,
    name: faker.system.fileName(),
    type: faker.helpers.arrayElement(['PDF', 'DOCX', 'TXT']),
    version: faker.system.semver(),
    uploadedAt: faker.date.recent({ days: 90 }).toISOString(),
    ...overrides,
  };
}
