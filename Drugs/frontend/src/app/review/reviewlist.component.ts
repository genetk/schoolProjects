import { Component, effect, inject, input, signal } from '@angular/core';
import { Review, ReviewService } from './review.service';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth/auth.service';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
@Component({
  selector: 'app-reviewlist',
  standalone: true,
  imports: [RouterLink, MatListModule, NgClass,MatIconModule],
  template: `
    <div class="review-card">
      @for(rev of $reviewData();track rev._id){
      <div class="review-container">
        <a
          [routerLink]="['', 'medications', med_id(), 'reviews', rev._id]"
          class="review-link"
        >
          <p class="review-text">Review:{{ rev.review }}</p>
          <p class="rating-text">
            Rating: @for(star of stars;track star){
            <mat-icon [ngClass]="{ filled: star <= rev.rating }">
              {{ star <= rev.rating ? 'star' : 'star_border' }}
            </mat-icon>
            }
          </p></a
        >
      </div>

      } @empty{

      <p>no data found</p>

      }
    </div>
  `,
  styles: [
    ` .review-card-container {
      display: flex;
      flex-direction: column;
      justify-content: center; 
      min-height: 100vh; 
      padding: 16px;
      background-color: #f8f9fa; 
    }

    .review-card {
      margin-bottom: 16px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      padding: 16px;
      background-color: #ffffff; 
      width: 100%;
      max-width: 600px; 
    }

    .review-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .review-link {
      text-decoration: none;
      color: inherit;
    }

    .review-text {
      font-size: 18px;
      font-weight: bold;
      color: #343a40;
      margin: 0;
    }

    .rating-container {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 8px;
    }

    .mat-icon {
      font-size: 24px;
      color: #e0e0e0;
      transition: color 0.3s ease;
    }

    .mat-icon.filled {
      color: #ffd700;
    }

    .mat-icon:not(.filled) {
      color: #e0e0e0;


    `
  ],
})
export class ReviewlistComponent {
  readonly med_id = input<string>('');
  readonly review_id = input<string>('');
  readonly #reviewservice = inject(ReviewService);

  readonly authservice = inject(AuthService);
  $reviewData = signal<Review[]>([]);
  stars = [1, 2, 3, 4, 5];

  constructor() {
    effect(() => {
      this.#reviewservice
        .getReviewsByMedicationId(this.med_id())
        .subscribe((response) => {
          if (response.success) {
            this.$reviewData.set(response.data);
          }
        });
    });
  }
  trackById(index: number, review: Review): string {
    return review._id;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
