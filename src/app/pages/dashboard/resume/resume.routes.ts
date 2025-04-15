import { Routes } from '@angular/router';
import { Endpoints } from '@core/enums';

export const resume_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./resume.component').then((c) => c.ResumeComponent),
  },
  {
    path: Endpoints.SUMMARY,
    title: 'Resumen facturas',
    loadComponent: () =>
      import('./summary/summary.component').then((m) => m.SummaryComponent),
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
