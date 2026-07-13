import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { faker } from '@faker-js/faker';
import type { Revision } from '@/types/revision.types';
import type { Model } from '@/types/model.types';
import type { Project } from '@/types/project.types';
import type { Discipline } from '@/types/discipline.types';

type RevisionSortBy = 'date' | 'status';

function getRevisionModel(revision: Revision): Model | undefined {
  return db.models.find((item) => item.id === revision.modelId);
}

function getRevisionDiscipline(model: Model): Discipline | undefined {
  return db.disciplines.find((discipline) => discipline.id === model.disciplineId);
}

function getRevisionProject(model: Model): Project | undefined {
  return db.projects.find((project) => project.id === model.projectId);
}

function getExtendedRevision(
  revision: Revision,
): Revision & { modelName: string; projectName: string; disciplineName: string } {
  const model = getRevisionModel(revision);

  const project = model && getRevisionProject(model);

  const discipline = model && getRevisionDiscipline(model);

  return {
    ...revision,
    modelName: model?.name ?? '',
    projectName: project?.name ?? '',
    disciplineName: discipline?.name ?? '',
  };
}

function compareStrings(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: 'base' });
}

function getPositiveInteger(value: string | null, fallback: number): number {
  const parsedValue = Number.parseInt(value ?? '', 10);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
}

export const handlers = [
  http.get('/api/revisions', ({ request }) => {
    const url = new URL(request.url);

    const status = url.searchParams.get('status');
    const projectId = url.searchParams.get('projectId');
    const searchTerm = (url.searchParams.get('q') ?? '').trim().toLowerCase();
    const sortBy = url.searchParams.get('sortBy') as RevisionSortBy | null;
    const sortDirection = url.searchParams.get('sortDir') === 'asc' ? 1 : -1;

    const page = getPositiveInteger(url.searchParams.get('page'), 1);

    const limit = getPositiveInteger(url.searchParams.get('pageSize'), 10);

    const filteredRevisions = db.revisions
      .map(getExtendedRevision)
      .filter((revision) => {
        if (status && revision.status !== status) {
          return false;
        }

        const model = getRevisionModel(revision);

        if (projectId && model?.projectId !== projectId) {
          return false;
        }

        if (!searchTerm) {
          return true;
        }

        return (
          revision.projectName.toLowerCase().includes(searchTerm) ||
          revision.status.toLowerCase().includes(searchTerm)
        );
      })
      .sort((left, right) => {
        if (sortBy === 'status') {
          const comparison = compareStrings(left.status, right.status);

          return comparison * sortDirection;
        }

        const comparison = new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();

        return comparison * sortDirection;
      });

    const total = filteredRevisions.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * limit;
    const revisions = filteredRevisions.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      data: revisions,
      meta: {
        page: currentPage,
        limit,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  }),

  http.get('/api/revisions/:id', ({ params }) => {
    const revision = db.revisions.find((revision) => revision.id === params.id);

    if (!revision) {
      return HttpResponse.json({ status: 404, message: 'Revisão não encontrada.' });
    }

    return HttpResponse.json({
      data: db.revisions.find((revision) => revision.id === params.id) || null,
    });
  }),

  http.post('/api/revisions', async ({ request }) => {
    const body = (await request.json()) as Revision;

    const revision: Revision = {
      ...body,
      id: faker.string.uuid(),
      createdAt: new Date().toISOString(),
    };

    db.revisions.push(revision);

    return HttpResponse.json({
      success: true,
      data: revision,
    });
  }),
];
