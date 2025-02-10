import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../../models/User'

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private userService: UserService, private router: Router) {}

  user: User[] = []; // Now the user is an array of User objects
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  createUser() {
    if (
      !this.validateName() ||
      !this.validateEmail() ||
      !this.validatePassword()
    ) {
      return;
    }

    const newUser = new User(this.name, this.email, this.password, "Trainer"); // Creating a new User using the model
    this.userService
      .postUser(newUser)
      .pipe(
        tap((data) => {
          console.log('User added:', data);
        }),
        catchError((error) => {
          console.error('Error adding user:', error);
          return of(null);
        })
      )
      .subscribe();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  validateName(): boolean {
    if (!this.name) {
      this.errorMessage = 'Name cannot be empty';
      return false;
    }
    if (/^\d+$/.test(this.name)) {
      this.errorMessage = 'Name cannot contain only numbers';
      return false;
    }
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

    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedEmail)
    ) {
      this.errorMessage = 'Email format is invalid';
      return false;
    }

    return true;
  }

  validatePassword(): boolean {
    if (!this.password) {
      this.errorMessage = 'Password cannot be empty';
      return false;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters';
      return false;
    }
    if (this.password.length > 255) {
      this.errorMessage = 'Password cannot exceed 255 characters';
      return false;
    }
    if (!/[a-z]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one lowercase letter';
      return false;
    }
    if (!/[A-Z]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one uppercase letter';
      return false;
    }
    if (!/[0-9]/.test(this.password)) {
      this.errorMessage = 'Password must contain at least one number';
      return false;
    }
    if (!/[^a-zA-Z0-9]/.test(this.password)) {
      this.errorMessage =
        'Password must contain at least one special character';
      return false;
    }

    return true;
  }
}
