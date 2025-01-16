import { Routes } from '@angular/router';

export const dashboard_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./dashboard.component').then((c) => c.DashboardComponent),
    children: [
      {
        path: 'resume',
        title: 'Resumen',
        loadComponent: () =>
          import('./resume/resume.component').then((c) => c.ResumeComponent),
        data: {
          icon: 'home',
        },
      },
      {
        path: 'budget',
        title: 'Presupuestos',
        loadChildren: () =>
          import('./budget/budget.routes').then((r) => r.budget_routes),
        data: {
          icon: 'document',
        },
      },
      {
        path: 'invoice',
        title: 'Facturas',
        loadChildren: () =>
          import('./invoice/invoice.routes').then((r) => r.invoice_routes),
        data: {
          icon: 'briefcase',
        },
      },
      {
        path: 'client',
        title: 'Clientes',
        loadChildren: () =>
          import('./client/client.routes').then((r) => r.client_routes),
        data: {
          icon: 'person-circle',
        },
      },
      {
        path: 'construction',
        title: 'Obras',
        loadChildren: () =>
          import('./construction/construction.routes').then(
            (r) => r.construction_routes
          ),
        data: {
          icon: 'hammer',
        },
      },
      {
        path: 'product',
        title: 'Productos',
        loadChildren: () =>
          import('./product/product.routes').then((r) => r.product_routes),
        data: {
          icon: 'newspaper',
        },
      },
      {
        path: 'configuration',
        title: 'Configuracion',
        loadComponent: () =>
          import('./configuration/configuration.component').then(
            (c) => c.ConfigurationComponent
          ),
        data: {
          icon: 'settings',
        },
      },
      {
        path: '**',
        redirectTo: 'resume',
        pathMatch: 'full',
      },
    ],
  },
];
