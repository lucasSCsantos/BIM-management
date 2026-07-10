import { api } from '@/lib/api';
import type { DefaultGetResponse, DefaultListResponse } from '@/types/api.types';
import type { Model } from '@/types/model.types';

type GetModelsResponse = DefaultListResponse<Model>;
type GetModelResponse = DefaultGetResponse<Model>;

export async function getModels() {
  const { data } = await api.get<GetModelsResponse>(`/models`);
  return data;
}

export async function getModel(id: string) {
  const { data } = await api.get<GetModelResponse>(`/models/${id}`);
  return data;
}
