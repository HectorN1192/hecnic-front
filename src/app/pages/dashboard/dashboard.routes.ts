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
      },
      {
        path: 'client',
        title: 'Clientes',
        loadChildren: () =>
          import('./client/client.routes').then((r) => r.client_routes),
      },
      {
        path: 'product',
        title: 'Productos',
        loadChildren: () =>
          import('./product/product.routes').then((r) => r.product_routes),
      },
      {
        path: '**',
        redirectTo: 'resume',
        pathMatch: 'full',
      },
    ],
  },
];
