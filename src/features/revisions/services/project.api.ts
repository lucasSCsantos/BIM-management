import { api } from '@/lib/api';

export async function getProjects() {
  const { data } = await api.get(`/projects?`);
  return data;
}

export async function getProject(id: string) {
  const { data } = await api.get(`/projects/${id}`);
  return data;
}
