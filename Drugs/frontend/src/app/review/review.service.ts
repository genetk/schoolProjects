import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, input, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MedicationService } from '../medication/medication.service';
export type Review = {
  _id: string;
  review: string;
  rating: number;
  by: { user_id: string; fullname: string };
  date: number;
};
export const initial_state = {
  _id: '',
  review: '',
  rating: 0,
  by: { user_id: '', fullname: '' },
  date: 0,
};

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  readonly #http = inject(HttpClient);

  review = signal<Review>(initial_state);
  medService = inject(MedicationService);

  constructor() {}

  postReview(med_id: string, reviewData: Review) {
    return this.#http.post<{ success: boolean; data: string }>(
      environment.BACK_END_URL + '/medications/' + med_id + '/reviews',
      reviewData
    );
  }

  getReviewsByMedicationId(med_id: string) {
    return this.#http.get<{ success: boolean; data: Review[] }>(
      environment.BACK_END_URL + '/medications/' + med_id + '/reviews'
    );
  }

  updateReview(med_id: string, review_id: string, reviewData: Review) {
    return this.#http.put<{ success: boolean; data: boolean }>(
      environment.BACK_END_URL +
        '/medications/' +
        med_id +
        '/reviews/' +
        review_id,
      reviewData
    );
  }

  getReviewById(med_id: string, reviewId: string) {
    return this.#http.get<{ success: boolean; data: Review }>(
      environment.BACK_END_URL +
        '/medications/' +
        med_id +
        '/reviews/' +
        reviewId
    );
  }

  deleteReview(med_id: string, reviewId: string) {
    return this.#http.delete<{ success: boolean; data: boolean }>(
      environment.BACK_END_URL +
        '/medications/' +
        med_id +
        '/reviews/' +
        reviewId
    );
  }
}
