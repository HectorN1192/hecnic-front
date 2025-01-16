import { Routes } from '@angular/router';
import { RouteActions } from '@core/enums';

export const product_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product.component').then((c) => c.ProductComponent),
  },
  {
    path: RouteActions.CREATE,
    title: 'Crear producto',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: RouteActions.EDIT_ID,
    title: 'Editar producto',
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
