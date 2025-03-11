import { Routes } from '@angular/router';
import { RouteActions } from '@core/enums';

export const construction_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./construction.component').then((c) => c.ConstructionComponent),
  },
  {
    path: RouteActions.CREATE,
    title: 'Crear Obra',
    loadComponent: () =>
      import('./construction-detail/construction-detail.component').then(
        (m) => m.ConstructionDetailComponent
      ),
  },
  {
    path: RouteActions.EDIT_ID,
    title: 'Editar Obra',
    loadComponent: () =>
      import('./construction-detail/construction-detail.component').then(
        (m) => m.ConstructionDetailComponent
      ),
  },
  {
    path: RouteActions.VIEW_ID,
    loadComponent: () =>
      import('./construction-detail/construction-detail.component').then(
        (m) => m.ConstructionDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
