import { Component, inject, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review, ReviewService } from './review.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-addreview',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="add()">
      <mat-form-field appearance="fill">
        <mat-label>Review</mat-label>
        <input matInput placeholder="review" formControlName="review" />
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Rating</mat-label>
        <input
          matInput
          type="number"
          placeholder="rating"
          formControlName="rating"
        />
      </mat-form-field>

      <button type="submit" mat-raised-button color="primary">
        Add Review
      </button>
    </form>
  `,
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 400px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AddreviewComponent {
  readonly #Toastr = inject(ToastrService);
  readonly #reviewService = inject(ReviewService);
  readonly #route = inject(Router);
  readonly med_id = input<string>('');
  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    review: ['', Validators.required],
    rating: [0, Validators.required],
  });

  add() {
    if (this.form.valid) {
      this.#reviewService
        .postReview(this.med_id(), this.form.value as Review)
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.#Toastr.success('Review added successfully');
              this.#route.navigate(['', 'medications', this.med_id()]);
            }
          },
        });
    } else {
      this.#Toastr.error('Please fill in all required fields');
    }
  }
}
