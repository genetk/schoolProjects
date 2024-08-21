import { Component, inject, input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review, ReviewService } from './review.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-addreview',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="add()">
      <mat-form-field appearance="fill">
        <mat-label>Review</mat-label>
        <textarea
          matInput
          placeholder="Write your review here"
          formControlName="review"
          rows="4"
        ></textarea>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Rating</mat-label>
        <div class="star-rating">
          @for(star of stars;track star;let i=$index){
          <mat-icon
            [ngClass]="{ filled: i < form.controls['rating'].value }"
            (click)="setRating(i + 1)"
            class="star-icon"
          >
            {{ i < form.controls['rating'].value ? 'star' : 'star_border' }}
          </mat-icon>

          }
        </div>
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
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.mat-form-field {
  width: 100%;
}

      .star-rating {
        display: flex;
        gap: 4px;
        align-items: center;
        cursor: pointer;
        justify-content: center;
      }
      .star-icon {
  font-size: 32px;
  transition: color 0.3s ease;
}

.star-icon.filled {
  color: #ffd700; /* Gold color for filled stars */
}

.star-icon:hover,
.star-icon:hover ~ .star-icon {
  color: #ffa500; /* Orange color on hover */
}

button {
  margin-top: 16px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 25px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #007bff;
  box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.3);
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
  stars = Array(5).fill(0);

  setRating(star: number) {
    this.form.controls['rating'].setValue(star);
  }

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
