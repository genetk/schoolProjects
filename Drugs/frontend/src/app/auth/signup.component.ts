import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { User } from './user.type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submitSignup()">
      <input placeholder="fullName" [formControl]="fullname" />
      <input type="email" placeholder="email" [formControl]="email" />
      <input placeholder="password" [formControl]="password" type="password" />
      <button type="submit">signup</button>
    </form>
  `,
  styles: ``,
})
export class SignupComponent {
  readonly #auth = inject(AuthService);
  readonly #route = inject(Router);
  form = inject(FormBuilder).nonNullable.group({
    fullname: '',
    email: '',
    password: '',
  });

  get fullname() {
    return this.form.controls.fullname;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  submitSignup() {
    this.#auth.signUp(this.form.value as User).subscribe((response) => {
      if (response.success) {
        this.#route.navigate(['signin']);
      }
    });
  }
}
