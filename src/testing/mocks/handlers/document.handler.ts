import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get('/api/documents', () => {
    return HttpResponse.json({
      data: db.documents,
    });
  }),

  http.get('/api/documents/:id', ({ params }) => {
    return HttpResponse.json({
      data: db.documents.find((document) => document.id === params.id) || null,
    });
  }),
];
