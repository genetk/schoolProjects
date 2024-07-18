import { Component, effect, inject, input, signal } from '@angular/core';
import { Review, ReviewService } from './review.service';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterLink, DatePipe, MatCardModule, MatListModule],
  template: `
    <mat-card>
      <mat-list role="list">
        <mat-list-item role="listitem"
          >Review: {{ $reviewData().review }}</mat-list-item
        >
        <mat-list-item role="listitem"
          >Rating: {{ $reviewData().rating }}</mat-list-item
        >
        <mat-list-item role="listitem"
          >Date: {{ $reviewData().date | date : 'MM/dd/yy' }}</mat-list-item
        >
      </mat-list>

      <div>
        @if($reviewData().by.user_id === authService.$state()._id){
        <button
          mat-button
          [routerLink]="[
            '',
            'medications',
            med_id(),
            'reviews',
            'update',
            $reviewData()._id
          ]"
        >
          Update
        </button>
        <button mat-button (click)="delete()">Delete</button>
        }
      </div>
    </mat-card>
  `,
  styles: `
    mat-card {
      width: 400px;
      margin: 20px auto;
      padding: 20px;
    }

    mat-list-item {
      padding: 10px 0;
    }
  `,
})
export class ReviewsComponent {
  med_id = input<string>('');
  review_id = input<string>('');
  readonly #reviewService = inject(ReviewService);
  readonly authService = inject(AuthService);
  readonly #router = inject(Router);
  toastr = inject(ToastrService);
  $reviewData = signal<Review>({
    _id: '',
    review: '',
    rating: 0,
    by: { user_id: '', fullname: '' },
    date: 0,
  });

  constructor() {
    effect(() => {
      this.#reviewService
        .getReviewById(this.med_id(), this.review_id())
        .subscribe((response) => {
          if (response.success) {
            this.$reviewData.set(response.data);
            console.log(this.$reviewData());
          }
        });
    });
  }

  delete() {
    this.#reviewService
      .deleteReview(this.review_id(), this.med_id())
      .subscribe((response) => {
        if (response.success) {
          this.toastr.success('Deleted successfully');
          this.#router.navigate(['', 'medications', this.med_id(), 'reviews']);
        }
      });
  }
}
