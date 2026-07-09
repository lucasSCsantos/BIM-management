import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get('/api/professionals', () => {
    return HttpResponse.json({
      data: db.professionals,
    });
  }),

  http.get('/api/professionals/:id', ({ params }) => {
    return HttpResponse.json({
      data: db.professionals.find((professional) => professional.id === params.id) || null,
    });
  }),
];
