import { Routes } from '@angular/router';
import { RouteActions } from '@core/enums';

export const client_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./client.component').then((c) => c.ClientComponent),
  },
  {
    path: RouteActions.CREATE,
    title: 'Crear Cliente',
    loadComponent: () =>
      import('./client-detail/client-detail.component').then(
        (m) => m.ClientDetailComponent
      ),
  },
  {
    path: RouteActions.EDIT_ID,
    title: 'Editar Cliente',
    loadComponent: () =>
      import('./client-detail/client-detail.component').then(
        (m) => m.ClientDetailComponent
      ),
  },
  {
    path: RouteActions.VIEW_ID,
    title: 'Datos del Cliente',
    loadComponent: () =>
      import('./client-view/client-view.component').then(
        (m) => m.ClientViewComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
