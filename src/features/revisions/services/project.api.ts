import { api } from '@/lib/api';
import type { Project } from '@/types/project.types';

export async function getProjects() {
  const { data } = await api.get<Project[]>(`/projects`);
  return data;
}

export async function getProject(id: string) {
  const { data } = await api.get<Project>(`/projects/${id}`);
  return data;
}
