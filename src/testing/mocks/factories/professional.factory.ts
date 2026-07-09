import { faker } from '@faker-js/faker';
import type { Professional } from '@/types/professional.types';

export function createProfessional(overrides?: Partial<Professional>): Professional {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(['Architect', 'Engineer', 'Contractor']),
    crea: faker.string.numeric({ length: { min: 5, max: 10 } }),
    ...overrides,
  };
}
