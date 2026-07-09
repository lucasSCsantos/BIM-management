import { faker } from '@faker-js/faker';
import type { Model } from '@/types/model.types';
import type { Project } from '@/types/project.types';
import type { Discipline } from '@/types/discipline.types';

export function createModel(
  project: Project,
  discipline: Discipline,
  overrides?: Partial<Model>,
): Model {
  return {
    id: faker.string.uuid(),
    projectId: project.id,
    disciplineId: discipline.id,
    name: faker.commerce.productName(),
    software: faker.helpers.arrayElement(['Revit', 'AutoCAD', 'SketchUp']),
    version: faker.system.semver(),
    createdAt: faker.date.recent({ days: 90 }).toISOString(),
    ...overrides,
  };
}
