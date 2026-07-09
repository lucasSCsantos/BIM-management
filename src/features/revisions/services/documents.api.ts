import { api } from '@/lib/api';
import type { Document } from '@/types/document.types';

export async function getDocuments() {
  const { data } = await api.get<Document[]>(`/document`);
  return data;
}

export async function getDocument(id: string) {
  const { data } = await api.get<Document>(`/document/${id}`);
  return data;
}
