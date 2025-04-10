import { Routes } from '@angular/router';
import { authGuardFn } from '@core/services';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (r) => r.dashboard_routes
      ),
    canActivate: [authGuardFn],
    canActivateChild: [authGuardFn],
  },
];
