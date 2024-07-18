import { Component, effect, inject, input, signal } from '@angular/core';
import { Medication, MedicationService } from './medication.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [RouterLink, MatListModule, MatCardModule, MatChipsModule],
  template: `
    <mat-card class="example-card">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-title>ID: {{ $med()._id }}</mat-card-title>
          <mat-card-title>Name: {{ $med().name }}</mat-card-title>
          <mat-card-title
            >Generic Name: {{ $med().generic_name }}</mat-card-title
          >
          <mat-card-title
            >Medication Class:{{ $med().medication_class }}</mat-card-title
          >
          <mat-card-title
            >Availability:{{ $med().availability }}</mat-card-title
          >
          <mat-card-title
            >Full Name:{{ $med().added_by.fullname }}</mat-card-title
          >
          <img
            mat-card-image
            src="http://localhost:3000/medications/images/{{
              $med().image?._id
            }}"
            [alt]="$med().name"
          />
        </mat-card-title-group>
      </mat-card-header>
      <div>
        @if($med().added_by.user_id === auth.$state()._id){
        <mat-card-footer class="example-card-footer">
          <mat-chip color="primary" (click)="handleUpdate()">Update</mat-chip>
          <mat-chip color="warn" (click)="handleDelete()">Delete</mat-chip>
        </mat-card-footer>
        }
      </div>
    </mat-card>
    <mat-list>
      <mat-list-item>
        <a [routerLink]="['', 'medications', $med()._id, 'reviews', 'add']"
          >Add Review</a
        >
      </mat-list-item>
      <mat-list-item>
        <a [routerLink]="['', 'medications', $med()._id, 'reviews', 'list']"
          >Review List</a
        >
      </mat-list-item>
    </mat-list>
  `,
  styles: [
    `
      .example-card {
        max-width: 400px;
        margin: 20px auto;
      }
      .example-card-footer {
        padding: 16px;
        display: flex;
        justify-content: space-between;
      }
      mat-chip {
        cursor: pointer;
      }
    `,
  ],
})
export class MedicationComponent {
  readonly #medService = inject(MedicationService);
  readonly auth = inject(AuthService);
  readonly med_id = input<string>('');

  readonly #router = inject(Router);
  readonly #toastr = inject(ToastrService);
  $med = signal<Medication>({
    _id: '',
    name: '',
    first_letter: '',
    generic_name: '',
    medication_class: '',
    availability: '',
    image: { filename: '', originalname: '' },
    added_by: { user_id: '', fullname: '', email: '' },
    reviews: [],
  });

  constructor() {
    effect(() => {
      if (this.med_id() !== '') {
        this.#medService
          .getMedication_ById(this.med_id())
          .subscribe((response) => {
            if (response.success) {
              this.$med.set(response.data);
            }
          });
      }
    });
  }

  handleUpdate() {
    this.#router.navigate(['', 'medications', 'update', this.med_id()]);
  }

  handleDelete() {
    this.#medService.deleteMedication(this.med_id()).subscribe((response) => {
      if (response.data) {
        this.#toastr.success('Deleted successfully');
        this.#router.navigate(['']);
      }
    });
  }
}
