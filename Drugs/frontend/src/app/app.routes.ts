import { Router, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin.component';
import { AuthService } from './auth/auth.service';
import {  inject } from '@angular/core';


const sign_guard = () => {
  const router = inject(Router);
  const signedIn = inject(AuthService).isloggedin();

  if (signedIn) {
    router.navigate(['', 'medications', 'list']);
    return false;
  } else {
    return true;
  }
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./medication/medlist.component').then((c) => c.MedlistComponent),
  },

  {
    path: 'users/signin',
    component: SigninComponent,
    canActivate: [sign_guard],
    pathMatch: 'full',
  },
  {
    path: 'users/signup',
    loadComponent: () =>
      import('./auth/signup.component').then((c) => c.SignupComponent),
    canActivate: [() => !inject(AuthService).isloggedin()],
  },

  {
    path: 'medications',
    loadChildren: () =>
      import('./medication/medication.routes').then((r) => r.medroutes),
  },

  { path: '**', redirectTo:'' },
];
