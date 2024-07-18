import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService, initialState } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{ auth.$state().fullname }}!</h1>
    @if(auth.isloggedin()){
    <nav>
      <ul>
        <li>
          <a [routerLink]="['', 'medications', 'add']">Add new medication</a>
        </li>
        <li><a (click)="logout()">logout</a></li>
      </ul>
    </nav>
    }@else{
    <nav>
      <ul>
        <li><a [routerLink]="['', 'users', 'signup']">signup</a></li>
        <li><a [routerLink]="['', 'users', 'signin']">signin</a></li>
      </ul>
    </nav>
    }
    <router-outlet />
  `,
  styles: [
    `
      nav > ul > li {
        display: inline-block;
        padding-right: 20px;
      }
    `,
  ],
})
export class AppComponent {
  med_id = input<string>('');

  readonly auth = inject(AuthService);
  readonly #route = inject(Router);

  logout() {
    this.auth.$state.set(initialState);
    this.#route.navigate(['']);
  }
}
