import { Routes } from '@angular/router';
import { RouteActions } from '@core/enums';

export const budget_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./budget.component').then((c) => c.BudgetComponent),
  },
  {
    path: RouteActions.CREATE,
    title: 'Crear Presupuesto',
    loadComponent: () =>
      import('./budget-detail/budget-detail.component').then(
        (m) => m.BudgetDetailComponent
      ),
  },
  {
    path: RouteActions.EDIT_ID,
    title: 'Editar Presupuesto',
    loadComponent: () =>
      import('./budget-detail/budget-detail.component').then(
        (m) => m.BudgetDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
