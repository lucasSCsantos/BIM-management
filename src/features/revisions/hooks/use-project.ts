import { useQuery } from '@tanstack/react-query';
import { getProject, getProjects } from '../services/project.api';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => getProject(id),
  });
}
