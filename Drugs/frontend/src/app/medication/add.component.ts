import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MedicationService } from './medication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add',
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
      <form [formGroup]="form" (ngSubmit)="addMedication()">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
          @if(name.hasError('nameExist')){
          <mat-error> name already Existed </mat-error>
          }
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
          <input matInput formControlName="medication_class" />
        </mat-form-field>

        <div>
          <label>Medication Image</label>
          <input type="file" (change)="setFile($event)" />
        </div>

        <button type="submit" mat-button>Add Medication</button>
      </form>
    </mat-card>
  `,
  styles: `
  `,
})
export class AddComponent {
  readonly medService = inject(MedicationService);
  readonly #route = inject(Router);
  readonly #toastr = inject(ToastrService);
  file!: File;
  form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required], this.checkNameExist.bind(this)],

    generic_name: ['', Validators.required],
    medication_class: ['', Validators.required],
    availability: '',
    medication_image: '',
  });
  setFile(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0];
  }
  get name() {
    return this.form.controls.name;
  }

  checkNameExist(
    control: AbstractControl
  ): Observable<null | Record<string, boolean>> {
    return this.medService.checkMed_NameExist({ name: this.name.value });
  }

  addMedication() {
    const formData = new FormData();
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
    this.medService.postMedication(formData).subscribe((response) => {
      if (response.success) {
        this.#toastr.success('Added Succesfully');
        this.medService.$medication.update((prev) => [...prev, response.data]);
        this.#route.navigate(['', 'medications', 'list'], {
          queryParams: { first_letter: '' },
        });
        this.form.reset();
      } else {
        this.#toastr.error('some is wrong,add again ');
      }
    });
  }
}
