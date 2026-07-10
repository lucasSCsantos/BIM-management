import { api } from '@/lib/api';
import type { DefaultGetResponse, DefaultListResponse } from '@/types/api.types';
import type { Project } from '@/types/project.types';

type GetProjectsResponse = DefaultListResponse<Project>;
type GetProjectResponse = DefaultGetResponse<Project>;

export async function getProjects() {
  const { data } = await api.get<GetProjectsResponse>(`/projects`);
  return data;
}

export async function getProject(id: string) {
  const { data } = await api.get<GetProjectResponse>(`/projects/${id}`);
  return data;
}
