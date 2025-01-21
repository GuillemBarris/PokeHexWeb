import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  validateName(): boolean {
    //Verifica que el nom no estigui buit
    if (!this.name) {
      this.errorMessage = 'Name cannot be empty';
      return false;
    }

    //Verifica que el nom no excedeixi a els 50 caracters
    if (/^\d+$/.test(this.name)) {
      this.errorMessage = 'Name cannot contain only numbers';
      return false;
    }

    //Verifica que el nom no excedixi els 50 caracters
    if (this.name.length > 50) {
      this.errorMessage = 'Name cannot exceed 50 characters';
      return false;
    }

    return true;
  }

  validateEmail(): boolean {
    const trimmedEmail = this.email.trim();

    if (!trimmedEmail) {
      this.errorMessage = 'Email cannot be empty';
      return false;
    }

    if (trimmedEmail.length > 50) {
      this.errorMessage = 'Email cannot exceed 50 characters';
      return false;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)) 
      {
        this.errorMessage = 'Email format is invalid';
      return false;
    }

    return true;
  }

  validatePassword(): boolean {
    if(!this.password) {
      this.errorMessage = 'Password cannot be empty';
      return false;
    }
    if(this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters';
      return false;
    }
    if(this.password.length > 255) {
      this.errorMessage = 'Password cannot exceed 255 characters';
      return false;
    }
    if(!/[a-z]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one lowercase letter';
      return false;
    }
    if(!/[A-Z]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one uppercase letter';
      return false;
    }
    if(!/[0-9]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one number';
      return false;
    }
    if(!/[^a-zA-Z0-9]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one special character';
      return false;
    }
    
    return true;

  }
}
