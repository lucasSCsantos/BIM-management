import { FormField } from '@/components/FormField';
import { useProjects } from '../hooks/use-project';
import type { RevisionStatus } from '@/types/revision.types';

type RevisionsFiltersProps = {
  projectId: string | null;
  status: RevisionStatus | null;
  onProjectIdChange: (projectId: string | null) => void;
  onStatusChange: (status: RevisionStatus | null) => void;
};

const statusLabels: Record<RevisionStatus, string> = {
  DRAFT: 'Rascunho',
  APPROVED: 'Aprovada',
  OBSOLETE: 'Obsoleta',
};

export function RevisionsFilters({
  projectId,
  status,
  onProjectIdChange,
  onStatusChange,
}: RevisionsFiltersProps) {
  const { data, isLoading } = useProjects();
  const projects = data?.data ?? [];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        as="select"
        label="Projeto"
        value={projectId ?? ''}
        onChange={(event) => onProjectIdChange(event.target.value || null)}
        disabled={isLoading}
      >
        <option value="">Todos os projetos</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </FormField>
      <FormField
        as="select"
        label="Situação"
        value={status ?? ''}
        onChange={(event) => onStatusChange((event.target.value || null) as RevisionStatus | null)}
      >
        <option value="">Todas as situações</option>
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </FormField>
    </div>
  );
}
