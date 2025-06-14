import { Component, } from '@angular/core';
import { FormsModule, NgForm, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

export function requiredValidator(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value.trim() !== '' ? null : { required: true };
}

export function argentinaMobileValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value ? control.value.trim() : '';
  const regex = /^([1-9]\d{2,4})(\d{6,8})$/;
  return regex.test(value) ? null : { argentinaMobile: true };
}

@Component({
  selector: 'app-points-identification',
  imports: [FormsModule],
  templateUrl: './points-identification.component.html',
  styleUrl: './points-identification.component.css'
})
export class PointsIdentificationComponent {
  userIdInput: string = '';
  phoneNumberInput: string = '';
  errorMessage: string | null = null;

  requiredValidator = requiredValidator;
  argentinaMobileValidator = argentinaMobileValidator;

  constructor(private _router:Router) { }

  onSubmit(form?: NgForm): void {
    this.errorMessage = null;
    if (!this.userIdInput || !this.phoneNumberInput) {
      this.errorMessage = 'Por favor, ingresa tu número de usuario y teléfono.';
      return;
    }
    const phoneError = argentinaMobileValidator({ value: this.phoneNumberInput } as AbstractControl);
    if (phoneError) {
      this.errorMessage = 'El número de teléfono debe ser un celular argentino válido.';
      return;
    }

    this._router.navigate(['/club/results', this.userIdInput, this.phoneNumberInput]);
  }

  setErrorMessage(message: string | null): void {
    this.errorMessage = message;
  }
}
