import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  login() {
    if (!this.validateEmail() || !this.validatePassword()) {
      return;
    } else if (
      this.validateEmail() == false ||
      this.validatePassword() == false
    ) {
      return;
    } else if (
      this.validateEmail() == true &&
      this.validatePassword() == true
    ) {
      this.errorMessage = 'Login success';
      this.userService
        .getUserByEmailAndPassword(this.email, this.password)
        .subscribe(
          (data) => {
            console.log('User added:', data);
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
    }
  }

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
      this.errorMessage= 'Worng password';
      return false;
    }
    if (this.password.length < 8) {
      this.errorMessage= 'Worng password';

      return false;
    }
    if (this.password.length > 255) {
      this.errorMessage= 'Worng password';
      return false;
    }
    if (!/[a-z]/.test(this.password)) {
      this.errorMessage= 'Worng password';
      return false;
    }
    if (!/[A-Z]/.test(this.password)) {
      this.errorMessage= 'Worng password';
      return false;
    }
    if (!/[0-9]/.test(this.password)) {
      this.errorMessage= 'Worng password';
      return false;
    }
    if (!/[^a-zA-Z0-9]/.test(this.password)) {
      this.errorMessage= 'Worng password';
      return false;
    }

    return true;
  }
  
}
