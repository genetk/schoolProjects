import { Injectable, inject, signal } from '@angular/core';

import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

export type Availability = { Prescription: string; OTC: string };
export type Image = { _id?: string; filename: string; originalname: string };
export type Review = {
  _id?: string;
  review: string;
  rating: number;
  by: { user_id: string; fullname: string };
  date: number;
};
export type Owner = { user_id: string; fullname: string; email: string };
export interface Medication {
  _id: string;
  name: string;
  first_letter: string;
  generic_name: string;
  medication_class: string;

  availability: string;
  image: Image;
  added_by: Owner;
  reviews: Review[];
}
export const initial_state = {
  _id: '',
  name: '',
  first_letter: '',
  generic_name: '',
  medication_class: '',

  availability: '',
  image: { filename: '', originalname: '' },
  added_by: { user_id: '', fullname: '', email: '' },
  reviews: [],
};

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  readonly #http = inject(HttpClient);
  $med = signal<Medication>(initial_state);
  $medication = signal<Medication[]>([]);

  getMedication_ByFirstLetter(letter: string) {
    return this.#http.get<{ success: boolean; data: Medication[] }>(
      environment.BACK_END_URL + `/medications?first_letter=${letter}`
    );
  }

  getMedication_ById(med_id: string) {
    return this.#http.get<{ success: boolean; data: Medication }>(
      environment.BACK_END_URL + '/medications/' + med_id
    );
  }

  postMedication(medication: FormData) {
    return this.#http.post<{ success: boolean; data: Medication }>(
      environment.BACK_END_URL + '/medications/',
      medication
    );
  }
  updateMedication(med_id: string, medication: FormData) {
    return this.#http.put<{ success: boolean; data: boolean }>(
      environment.BACK_END_URL + '/medications/' + med_id,
      medication
    );
  }
  deleteMedication(med_id: string) {
    return this.#http.delete<{ success: boolean; data: boolean }>(
      environment.BACK_END_URL + '/medications/' + med_id
    );
  }

  checkMed_NameExist(body: { name: string }) {
    return this.#http.post<null | Record<string, boolean>>(
      environment.BACK_END_URL + '/check_name',
      body
    );
  }
}
