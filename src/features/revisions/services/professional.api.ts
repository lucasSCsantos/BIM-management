import { api } from '@/lib/api';
import type { DefaultGetResponse, DefaultListResponse } from '@/types/api.types';
import type { Professional } from '@/types/professional.types';

type GetProfessionalsResponse = DefaultListResponse<Professional>;
type GetProfessionalResponse = DefaultGetResponse<Professional>;

export async function getProfessionals() {
  const { data } = await api.get<GetProfessionalsResponse>(`/professionals`);
  return data;
}

export async function getProfessional(id: string) {
  const { data } = await api.get<GetProfessionalResponse>(`/professionals/${id}`);
  return data;
}
