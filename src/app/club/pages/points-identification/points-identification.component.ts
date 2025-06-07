import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-points-identification',
  imports: [FormsModule, RouterLink],
  templateUrl: './points-identification.component.html',
  styleUrl: './points-identification.component.css'
})
export class PointsIdentificationComponent {
 userIdInput: string = '';
  phoneNumberInput: string = '';
  errorMessage: string | null = null;

  @Output() identifyUser = new EventEmitter<{ userId: string; phoneNumber: string; }>();

  constructor() { }

  onSubmit(): void {
    this.errorMessage = null;
    if (!this.userIdInput || !this.phoneNumberInput) {
      this.errorMessage = 'Por favor, ingresa tu número de usuario y teléfono.';
      return;
    }

    console.log(this.userIdInput)
    console.log(this.phoneNumberInput)
  }

  setErrorMessage(message: string | null): void {
    this.errorMessage = message;
  }

}
