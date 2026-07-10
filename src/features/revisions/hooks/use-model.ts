import { useQuery } from '@tanstack/react-query';
import { getModel, getModels } from '../services/model.api';

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: () => getModels(),
  });
}

export function useModel(id: string) {
  return useQuery({
    queryKey: ['models', id],
    queryFn: () => getModel(id),
  });
}
