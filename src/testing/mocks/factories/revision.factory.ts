import { faker } from '@faker-js/faker';
import type { Model } from '@/types/model.types';
import type { Professional } from '@/types/professional.types';
import type { Revision } from '@/types/revision.types';

export function createRevision(
  model: Model,
  professional: Professional,
  overrides?: Partial<Revision>,
): Revision {
  return {
    id: faker.string.uuid(),
    modelId: model.id,
    revision: faker.number.int({ min: 0, max: 9 }),
    status: faker.helpers.arrayElement(['DRAFT', 'APPROVED', 'OBSOLETE']),
    reviewer: professional.name,
    notes: faker.lorem.sentence(),
    createdAt: overrides?.createdAt ?? new Date().toISOString(),
    ...overrides,
  };
}
