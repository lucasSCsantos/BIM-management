import { faker } from '@faker-js/faker';
import type { Project } from '@/types/project.types';

export function createProject(overrides?: Partial<Project>): Project {
  const startDate = faker.date.recent({ days: 90 }).toISOString();
  const expectedEndDate = faker.date.soon({ days: 90, refDate: startDate }).toISOString();

  return {
    id: faker.string.uuid(),
    code: faker.string.alphanumeric({ length: 5 }).toUpperCase(),
    name: faker.company.name(),
    client: faker.person.fullName(),
    status: faker.helpers.arrayElement(['IN_PROGRESS', 'IN_REVIEW', 'FINISHED']),
    startDate,
    expectedEndDate,
    ...overrides,
  };
}
