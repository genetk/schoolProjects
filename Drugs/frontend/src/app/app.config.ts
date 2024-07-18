import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './auth/add-token.interceptor';
import { AuthService } from './auth/auth.service';

const bootstrap=()=>{
  const auth=inject(AuthService)
  return()=>{
    const persisted=localStorage.getItem('finalproject')
    if(persisted){
      auth.$state.set(JSON.parse(persisted))
    }
  }
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    provideToastr(),
   {provide:APP_INITIALIZER,multi:true,useFactory:bootstrap}
  ],
};
