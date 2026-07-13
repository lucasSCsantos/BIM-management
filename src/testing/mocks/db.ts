import { faker } from '@faker-js/faker';
import { createDocument } from './factories/document.factory';
import { createRevision } from './factories/revision.factory';
import { createModel } from './factories/model.factory';
import { createProject } from './factories/project.factory';
import { createProfessional } from './factories/professional.factory';
import { createDiscipline } from './factories/discipline.factory';

const disciplines = Array.from({ length: 24 }, () => createDiscipline());
const professionals = Array.from({ length: 32 }, () => createProfessional());
const projects = Array.from({ length: 12 }, () => createProject());

const models = Array.from({ length: 15 }, () =>
  createModel(faker.helpers.arrayElement(projects), faker.helpers.arrayElement(disciplines)),
);

const revisions = Array.from({ length: 56 }, () =>
  createRevision(faker.helpers.arrayElement(models), faker.helpers.arrayElement(professionals)),
);

const documents = Array.from({ length: 17 }, () =>
  createDocument(faker.helpers.arrayElement(projects)),
);

export const db = {
  disciplines,
  professionals,
  projects,
  models,
  revisions,
  documents,
};
