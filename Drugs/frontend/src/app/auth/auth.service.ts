import { HttpClient } from '@angular/common/http';
import { Injectable, effect, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from './user.type';
export interface State {
  _id: string;
  fullname: string;
  email: string;
  jwt: string;
}
export const initialState = {
  _id: '',
  fullname: 'Drug Store',
  email: '',
  jwt: '',
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $state = signal<State>(initialState);
  readonly #http = inject(HttpClient);

  signUp(users: User) {
    return this.#http.post<{ success: boolean; data: User }>(
      environment.BACK_END_URL + '/users/signup',
      users
    );
  }

  signin(credentials: { email: string; password: string }) {
    return this.#http.post<{ success: Boolean; data: string }>(
      environment.BACK_END_URL + '/users/signin',
      credentials
    );
  }

  isloggedin() {
    return this.$state()._id ? true : false;
  }

  constructor() {
    effect(() =>
      localStorage.setItem('finalproject', JSON.stringify(this.$state()))
    );
  }
}
