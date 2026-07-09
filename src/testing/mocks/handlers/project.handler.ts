import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get('/api/projects', () => {
    return HttpResponse.json({
      data: db.projects,
    });
  }),

  http.get('/api/projects/:id', ({ params }) => {
    return HttpResponse.json({
      data: db.projects.find((project) => project.id === params.id) || null,
    });
  }),
];
