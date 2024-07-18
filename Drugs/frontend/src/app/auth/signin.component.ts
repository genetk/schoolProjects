import { Component, inject } from '@angular/core';
import { AuthService, State } from './auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.type';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitSignin()">
      <input type="email" placeholder="email" [formControl]="email" />
      <div>
        @if(email.invalid && (email.dirty||email.touched)){
        <div>
          @if(email.errors?.['required']){
          <div>Email is required</div>
          } @if(email.errors?.['email']){
          <div>Email is not valid</div>
          }
        </div>
        }
      </div>
      <input placeholder="password" [formControl]="password" type="password" />
      <div>
        @if(password.invalid && (password.dirty||password.touched)){
        <div>
          @if(password.hasError('password')){
          <div>password is not valid</div>
          }
        </div>
        }
      </div>
      <button type="submit">signin</button>
    </form>
  `,
  styles: ``,
})
export class SigninComponent {
  readonly #toastr = inject(ToastrService);
  readonly #auth = inject(AuthService);
  readonly #route = inject(Router);
  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    email: ['geni@miu.edu', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  submitSignin() {
    this.#auth.signin(this.form.value as User).subscribe({
      next: (response) => {
        if (response.success) {
          const decodeToken = jwtDecode(response.data) as State;
          this.#auth.$state.set({
            _id: decodeToken._id,
            fullname: decodeToken.fullname,
            email: decodeToken.email,
            jwt: response.data,
          });

          this.#route.navigate(['list']);
        }
      },
      error: (error) => {
        this.#toastr.error('invalid email and password');
      },
    });
  }
}
