import { useQuery } from '@tanstack/react-query';
import { getDocument, getDocuments } from '../services/document.api';

export function useDocuments() {
  return useQuery({
    queryKey: ['documents'],
    queryFn: () => getDocuments(),
  });
}

export function useDocument(id: string) {
  return useQuery({
    queryKey: ['documents', id],
    queryFn: () => getDocument(id),
  });
}
