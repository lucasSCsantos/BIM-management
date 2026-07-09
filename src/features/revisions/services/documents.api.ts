import { api } from '@/lib/api';

export async function getDocuments() {
  const { data } = await api.get(`/document?`);
  return data;
}

export async function getDocument(id: string) {
  const { data } = await api.get(`/document/${id}`);
  return data;
}
