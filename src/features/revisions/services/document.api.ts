import { api } from '@/lib/api';
import type { DefaultGetResponse, DefaultListResponse } from '@/types/api.types';
import type { Document } from '@/types/document.types';

type GetDocumentsResponse = DefaultListResponse<Document>;
type GetDocumentResponse = DefaultGetResponse<Document>;

export async function getDocuments() {
  const { data } = await api.get<GetDocumentsResponse>(`/documents`);
  return data;
}

export async function getDocument(id: string) {
  const { data } = await api.get<GetDocumentResponse>(`/documents/${id}`);
  return data;
}
