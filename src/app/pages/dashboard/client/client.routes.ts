import { Routes } from '@angular/router';

export const client_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./client.component').then((c) => c.ClientComponent),
  },
  {
    path: 'create',
    title: 'Crear Cliente',
    loadComponent: () =>
      import('./client-detail/client-detail.component').then(
        (m) => m.ClientDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
