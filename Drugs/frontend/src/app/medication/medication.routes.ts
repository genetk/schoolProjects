import { Routes } from '@angular/router';
import { MedlistComponent } from './medlist.component';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const medroutes: Routes = [
  {
    path: '',
    component: MedlistComponent,
  },

  {
    path: 'list',
    loadComponent: () =>
      import('./medlist.component').then((c) => c.MedlistComponent),
  },
  {
    path: 'add',
    loadComponent: () => import('./add.component').then((c) => c.AddComponent),
    canActivate: [() => inject(AuthService).isloggedin()],
  },
  {
    path: 'update/:med_id',
    loadComponent: () =>
      import('./update.component').then((c) => c.UpdateComponent),
    canActivate: [() => inject(AuthService).isloggedin()],
  },
  {
    path: ':med_id',
    loadComponent: () =>
      import('./medication.component').then((c) => c.MedicationComponent),
  },
  {
    path: ':med_id/reviews',
    loadChildren: () =>
      import('../review/review.routes').then((c) => c.reviewroutes),
  },
];
