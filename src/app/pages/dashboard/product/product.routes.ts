import { Routes } from '@angular/router';

export const product_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product.component').then((c) => c.ProductComponent),
  },
  {
    path: 'create',
    title: 'Crear producte',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
