import { Component, effect, inject, input } from '@angular/core';
import { MedicationService } from '../medication/medication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
  ],
  template: `
    <mat-card class="example-card">
      <form [formGroup]="form" (ngSubmit)="updateMedication()">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Generic name</mat-label>
          <input matInput formControlName="generic_name" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Availability</mat-label>
          <mat-select formControlName="availability">
            <mat-option value="Prescription">Prescription</mat-option>
            <mat-option value="OTC">OTC</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Medication Class</mat-label>
          <textarea matInput formControlName="medication_class"></textarea>
        </mat-form-field>

        <div>
          <label>Medication Image</label>
          <input type="file" (change)="setFile($event)" />
        </div>

        <button
          type="submit"
          mat-raised-button
          color="primary"
          [disabled]="form.invalid"
        >
          Update medication
        </button>
      </form>
    </mat-card>
  `,
  styles: [
    `
      .example-card {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
      }
      mat-form-field {
        width: 100%;
        margin-bottom: 20px;
      }
      button {
        display: block;
        margin-top: 20px;
      }
    `,
  ],
})
export class UpdateComponent {
  med_id = input<string>('');
  readonly #medService = inject(MedicationService);
  readonly #route = inject(Router);
  readonly #toastr = inject(ToastrService);
  file!: File;
  form = inject(FormBuilder).nonNullable.group({
    _id: ['', Validators.required],
    name: ['', Validators.required],
    generic_name: ['', Validators.required],
    medication_class: '',
    availability: '',
    image: { filename: '', originalname: '' },
    added_by: { user_id: '', fullname: '', email: '' },
  });

  setFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
  }

  constructor() {
    effect(() => {
      this.#medService
        .getMedication_ById(this.med_id())
        .subscribe((response) => {
          if (response.success) {
            const data = response.data;
            // data.added_by.user_id = JSON.stringify(data.added_by);
            // data.image.filename = JSON.stringify(data.image);
            this.form.patchValue(response.data);
          }
        });
    });
  }

  updateMedication() {
    const formData = new FormData();
    formData.append('_id', this.form.get('_id')?.value as string);
    formData.append('name', this.form.get('name')?.value as string);
    formData.append(
      'generic_name',
      this.form.get('generic_name')?.value as string
    );
    formData.append(
      'medication_class',
      this.form.get('medication_class')?.value as string
    );
    formData.append(
      'availability',
      this.form.get('availability')?.value as string
    );
    formData.append('medication_image', this.file);
    this.#medService.updateMedication(this.med_id(), formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.#toastr.success('Successfully updated');
          this.#route.navigate(['', 'medications', this.med_id()]);
        }
      },
      error: () => {
        this.#toastr.error('Update failed, please try again');
      },
    });
  }
}
