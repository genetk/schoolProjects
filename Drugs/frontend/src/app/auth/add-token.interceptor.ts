import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  if (auth.isloggedin()) {
    const reqWithToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${auth.$state().jwt}`),
    });
    return next(reqWithToken);
  } else {
    return next(req);
  }
};
