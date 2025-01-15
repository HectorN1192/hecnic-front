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
        path: 'client',
        title: 'Clientes',
        loadChildren: () =>
          import('./client/client.routes').then((r) => r.client_routes),
        data: {
          icon: 'person-circle',
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
        path: '**',
        redirectTo: 'resume',
        pathMatch: 'full',
      },
    ],
  },
];
