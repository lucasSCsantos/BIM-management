import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get('/api/models', () => {
    return HttpResponse.json({
      data: db.models,
    });
  }),

  http.get('/api/models/:id', ({ params }) => {
    return HttpResponse.json({
      data: db.models.find((model) => model.id === params.id) || null,
    });
  }),
];
