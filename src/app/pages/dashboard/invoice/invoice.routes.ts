import { Routes } from '@angular/router';
import { RouteActions } from '@core/enums';

export const invoice_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./invoice.component').then((c) => c.InvoiceComponent),
  },
  {
    path: RouteActions.CREATE,
    title: 'Crear Obra',
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: RouteActions.EDIT_ID,
    title: 'Editar Obra',
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: RouteActions.COPY_ID,
    title: 'Editar Obra',
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: RouteActions.CREATE_INOVICE_BUDGET_ID,
    title: 'Editar Obra',
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
