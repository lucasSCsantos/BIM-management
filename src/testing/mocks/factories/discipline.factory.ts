import { faker } from '@faker-js/faker';
import type { Discipline } from '@/types/discipline.types';

export function createDiscipline(overrides?: Partial<Discipline>): Discipline {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    ...overrides,
  };
}
