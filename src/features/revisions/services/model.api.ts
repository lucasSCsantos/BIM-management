import { api } from '@/lib/api';

export async function getModels() {
  const { data } = await api.get(`/models?`);
  return data;
}

export async function getModel(id: string) {
  const { data } = await api.get(`/models/${id}`);
  return data;
}
