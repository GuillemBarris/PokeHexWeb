import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  validateEmail(): boolean {
    const trimmedEmail = this.email.trim();

    if (!trimmedEmail) {
      this.errorMessage= 'Worng email';
      return false;
    }

    if (trimmedEmail.length > 50) {
      this.errorMessage= 'Worng email';
      return false;
    }

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)
    ) {
      this.errorMessage= 'Worng email';
      return false;
    }

    return true;
  }
  validatePassword(): boolean {
    if (!this.password) {
      return false;
    }
    if (this.password.length < 8) {
      return false;
    }
    if (this.password.length > 255) {
      return false;
    }
    if (!/[a-z]/.test(this.password)) {
      return false;
    }
    if (!/[A-Z]/.test(this.password)) {
      return false;
    }
    if (!/[0-9]/.test(this.password)) {
      return false;
    }
    if (!/[^a-zA-Z0-9]/.test(this.password)) {
      return false;
    }

    return true;
  }
  
}
