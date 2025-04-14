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
    title: 'Crear Factura',
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: RouteActions.EDIT_ID,
    title: 'Editar Factura',
    data: { mode: RouteActions.EDIT },
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: RouteActions.COPY_ID,
    title: 'Editar Factura',
    data: { mode: RouteActions.COPY },
    loadComponent: () =>
      import('./invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
  {
    path: RouteActions.CREATE_INOVICE_BUDGET_ID,
    title: 'Editar Factura',
    data: { mode: RouteActions.CREATE_INOVICE_BUDGET },
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
