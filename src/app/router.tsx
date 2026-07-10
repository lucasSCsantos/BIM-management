import { Suspense } from 'react';
// import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router';
// import { queryClient } from '@/lib/react-query';
// import type { PreinitModuleOptions, PreloadModuleOptions } from 'react-dom';

function withSuspense(Component: React.LazyExoticComponent<React.ComponentType>) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Carregando...</div>}>
      <Component />
    </Suspense>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const convert = (queryClient: QueryClient) => (module: any) => {
  const {
    // clientLoader,
    // clientAction,
    Component,
    default: DefaultComponent,
    ...rest
  } = module;
  return {
    ...rest,
    // loader: clientLoader?.(queryClient),
    // action: clientAction?.(queryClient),
    Component: withSuspense(Component) || DefaultComponent,
  };
};

export const router = createBrowserRouter([
  {
    path: '/',
    // lazy: () =>
    //   import('@/features/revisions/routes/RevisionsDashboardPage').then(convert(queryClient)),
  },
  {
    path: '/revisions/new',
    // lazy: () => import('@/features/revisions/routes/RevisionCreatePage').then(convert(queryClient)),
  },
  {
    path: '/revisions/:id',
    // lazy: () =>
    // import('@/features/revisions/routes/RevisionDetailsPage').then(convert(queryClient)),
  },
]);
