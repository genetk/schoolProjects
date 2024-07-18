import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MedicationService } from './medication.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medlist',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule],
  template: `
    <div class="alphabet-container">
      @for(letter of alphabet;track letter){
      <span>
        <a
          mat-button
          [routerLink]="['', 'medications', 'list']"
          [queryParams]="{ first_letter: letter }"
          (click)="selected(letter)"
          class="alphabet-link"
        >
          {{ letter }}
        </a>
      </span>
      }
    </div>
    <div class="med-list-container">
      @for(med of displayedMed();track med._id){
      <mat-card class="med-card">
        <li>
          <a [routerLink]="['', 'medications', med._id]">{{ med.name }}</a>
        </li>
      </mat-card>
      }
    </div>
  `,
  styles: [
    `
      .alphabet-container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }
      .alphabet-link {
        margin: 5px;
      }
      .med-list-container {
        display: flex;
        flex-wrap: wrap;
      }
      .med-card {
        margin: 10px;
        padding: 10px;
        width: 200px;
      }
    `,
  ],
})
export class MedlistComponent {
  readonly medService = inject(MedicationService);
  first_letter = input<string>('');
  med_id = input<string>('');
  $selected_letter = signal('');
  readonly route = inject(Router);

  alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  displayedMed = computed(() =>
    this.medService
      .$medication()
      .filter((med) => this.$selected_letter() === med.name[0])
  );

  selected(letter: string) {
    this.$selected_letter.set(letter);
    this.fetchMedications(letter);
  }

  constructor() {
    effect(() => {
      if (!this.first_letter() || this.medService.$medication().length === 0) {
        this.fetchMedications(this.first_letter());
      }
    });
  }

  fetchMedications(letter: string) {
    this.medService
      .getMedication_ByFirstLetter(letter)
      .subscribe((response) => {
        if (response.success) {
          this.medService.$medication.set(response.data);
        }
      });
  }
}
