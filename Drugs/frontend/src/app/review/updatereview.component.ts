import { Component, effect, inject, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Review, ReviewService } from './review.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-updatereview',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="update()" class="review-form">
      <input
        matInput
        formControlName="review"
        placeholder="Review"
        class="form-control"
      />
      <input
        matInput
        formControlName="rating"
        placeholder="Rating"
        type="number"
        min="1"
        max="5"
        class="form-control"
      />
      <button
        type="submit"
        mat-raised-button
        color="primary"
        class="submit-button"
      >
        Update Review
      </button>
    </form>
  `,
  styles: [
    `
      .review-form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .review-form .form-control {
        width: 100%;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .review-form .form-control:focus {
        outline: none;
        border-color: #80bdff;
      }

      .review-form .submit-button {
        width: 100%;
      }
    `,
  ],
})
export class UpdatereviewComponent {
  readonly #Toastr = inject(ToastrService);
  readonly #reviewService = inject(ReviewService);
  readonly #route = inject(Router);
  readonly med_id = input<string>('');
  readonly review_id = input<string>('');
  form = inject(FormBuilder).nonNullable.group({
    _id: '',
    review: ['', Validators.required],
    rating: [3, Validators.required],
    by: { user_id: '', fullname: '' },
    date: 0,
  });

  constructor() {
    effect(() => {
      this.#reviewService
        .getReviewById(this.med_id(), this.review_id())
        .subscribe((response) => {
          if (response.success) {
            this.form.patchValue(response.data);
          }
        });
    });
  }

  update() {
    if (this.form.valid) {
      this.#reviewService
        .updateReview(
          this.med_id(),
          this.review_id(),
          this.form.value as Review
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.#Toastr.success('Updated successfully');
            }
          },
        });
    } else {
      this.#Toastr.error('Please fill out all fields correctly');
    }
  }
}
