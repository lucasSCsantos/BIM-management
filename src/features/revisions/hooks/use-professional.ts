import { useQuery } from '@tanstack/react-query';
import { getProfessional, getProfessionals } from '../services/professional.api';

export function useProfessionals() {
  return useQuery({
    queryKey: ['professionals'],
    queryFn: () => getProfessionals(),
  });
}

export function useProfessional(id: string) {
  return useQuery({
    queryKey: ['professionals', id],
    queryFn: () => getProfessional(id),
  });
}
