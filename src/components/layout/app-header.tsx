import { NavLink } from 'react-router';

import { cn } from '@/lib/utils';
import { AppContainer } from './app-container';

export function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-border bg-background">
      <AppContainer className="flex h-16 items-center gap-6 py-0">
        <NavLink to="/" className="shrink-0 text-base font-semibold text-foreground">
          Gestão BIM
        </NavLink>
        <nav aria-label="Navegação principal" className="flex min-w-0 items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
                isActive && 'bg-muted text-foreground',
              )
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </AppContainer>
    </header>
  );
}
