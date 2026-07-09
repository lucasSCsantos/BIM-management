import { faker } from '@faker-js/faker';
import { createDocument } from './factories/document.factory';
import { createRevision } from './factories/revision.factory';
import { createModel } from './factories/model.factory';
import { createProject } from './factories/project.factory';
import { createProfessional } from './factories/professional.factory';
import { createDiscipline } from './factories/discipline.factory';

const disciplines = Array.from({ length: 5 }, () => createDiscipline());
const professionals = Array.from({ length: 5 }, () => createProfessional());
const projects = Array.from({ length: 5 }, () => createProject());

const models = Array.from({ length: 5 }, () =>
  createModel(faker.helpers.arrayElement(projects), faker.helpers.arrayElement(disciplines)),
);

const revisions = Array.from({ length: 5 }, () =>
  createRevision(faker.helpers.arrayElement(models), faker.helpers.arrayElement(professionals)),
);

const documents = Array.from({ length: 5 }, () =>
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
