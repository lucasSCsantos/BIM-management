import { api } from '@/lib/api';

export async function getProfessionals() {
  const { data } = await api.get(`/professionals?`);
  return data;
}

export async function getProfessional(id: string) {
  const { data } = await api.get(`/professionals/${id}`);
  return data;
}
