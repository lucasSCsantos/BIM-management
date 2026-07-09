import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { createRevision } from '../factories/revision.factory';
import { faker } from '@faker-js/faker';
import type { Revision } from '@/types/revision.types';
import type { Model } from '@/types/model.types';
import type { Project } from '@/types/project.types';
import type { Discipline } from '@/types/discipline.types';

type RevisionOrderBy = 'date' | 'projectName';

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

    const statusFilters = url.searchParams
      .getAll('status')
      .flatMap((value) => value.split(','))
      .map((value) => value.trim())
      .filter(Boolean);

    const searchTerm = (url.searchParams.get('search') ?? url.searchParams.get('projectName') ?? '')
      .trim()
      .toLowerCase();

    const orderBy = (url.searchParams.get('orderBy') ?? 'date') as RevisionOrderBy;

    const orderDirection = url.searchParams.get('orderDirection') === 'asc' ? 1 : -1;

    const page = getPositiveInteger(url.searchParams.get('page'), 1);

    const limit = getPositiveInteger(
      url.searchParams.get('limit') ?? url.searchParams.get('pageSize'),
      10,
    );

    const filteredRevisions = db.revisions
      .map(getExtendedRevision)
      .filter((revision) => {
        if (statusFilters.length > 0 && !statusFilters.includes(revision.status)) {
          return false;
        }

        if (!searchTerm) {
          return true;
        }

        return revision.projectName.toLowerCase().includes(searchTerm);
      })
      .sort((left, right) => {
        if (orderBy === 'projectName') {
          const comparison = compareStrings(left.projectName, right.projectName);

          return comparison * orderDirection;
        }

        const comparison = new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();

        return comparison * orderDirection;
      });

    const total = filteredRevisions.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const startIndex = (currentPage - 1) * limit;
    const revisions = filteredRevisions.slice(startIndex, startIndex + limit);

    return HttpResponse.json({
      data: revisions,
      page: currentPage,
      limit,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    });
  }),

  http.get('/api/revisions/:id', ({ params }) => {
    return HttpResponse.json({
      data: db.revisions.find((revision) => revision.id === params.id) || null,
    });
  }),

  http.post('/api/revisions', async ({ request }) => {
    const body = (await request.json()) as Revision;

    const revision = createRevision(
      faker.helpers.arrayElement(db.models),
      faker.helpers.arrayElement(db.professionals),
      body,
    );

    db.revisions.push(revision);

    return HttpResponse.json({
      success: true,
      data: revision,
    });
  }),
];
