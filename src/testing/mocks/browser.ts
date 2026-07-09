import { setupWorker } from 'msw/browser';
import { handlers as revisionHandlers } from './handlers/revision.handler';
import { handlers as documentHandlers } from './handlers/document.handler';
import { handlers as modelHandlers } from './handlers/model.handler';
import { handlers as projectHandlers } from './handlers/project.handler';

const handlers = [...revisionHandlers, ...documentHandlers, ...modelHandlers, ...projectHandlers];

export const worker = setupWorker(...handlers);
