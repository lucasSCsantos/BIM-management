import { Outlet } from 'react-router';

import { AppContainer } from './app-container';
import { AppHeader } from './app-header';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader />
      <main className="pt-16">
        <AppContainer>
          <Outlet />
        </AppContainer>
      </main>
    </div>
  );
}
