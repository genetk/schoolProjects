import { Component, effect, inject, input, signal } from '@angular/core';
import { Review, ReviewService } from './review.service';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-reviewlist',
  standalone: true,
  imports: [RouterLink, MatListModule],
  template: `
    <div>
      @for(rev of $reviewData();track rev._id){
      <div>
        <a [routerLink]="['', 'medications', med_id(), 'reviews', rev._id]">
          <p>review:{{ rev.review }}</p>
          <p>rating:{{ rev.rating }}</p></a
        >
      </div>

      } @empty{
      <p>no data found</p>

      }
    </div>
  `,
  styles: ``,
})
export class ReviewlistComponent {
  readonly med_id = input<string>('');
  readonly review_id = input<string>('');
  readonly #reviewservice = inject(ReviewService);

  readonly authservice = inject(AuthService);
  $reviewData = signal<Review[]>([]);

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
}
