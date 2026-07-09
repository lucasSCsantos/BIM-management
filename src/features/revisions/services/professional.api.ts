import { api } from '@/lib/api';
import type { Professional } from '@/types/professional.types';

export async function getProfessionals() {
  const { data } = await api.get<Professional[]>(`/professionals`);
  return data;
}

export async function getProfessional(id: string) {
  const { data } = await api.get<Professional>(`/professionals/${id}`);
  return data;
}
