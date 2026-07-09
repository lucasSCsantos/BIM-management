import { api } from '@/lib/api';
import type { Model } from '@/types/model.types';

export async function getModels() {
  const { data } = await api.get<Model[]>(`/models`);
  return data;
}

export async function getModel(id: string) {
  const { data } = await api.get<Model>(`/models/${id}`);
  return data;
}
