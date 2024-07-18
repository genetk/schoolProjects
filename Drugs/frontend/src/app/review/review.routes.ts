import { Routes } from '@angular/router';

import { ReviewlistComponent } from './reviewlist.component';

export const reviewroutes: Routes = [
  {
    path: 'list',
    component: ReviewlistComponent,
  },

  {
    path: 'add',
    loadComponent: () =>
      import('./addreview.component').then((c) => c.AddreviewComponent),
  },
  {
    path: 'update/:review_id',
    loadComponent: () =>
      import('./updatereview.component').then((c) => c.UpdatereviewComponent),
  },
  {
    path: ':review_id',
    loadComponent: () =>
      import('./reviews.component').then((c) => c.ReviewsComponent),
  },
];
