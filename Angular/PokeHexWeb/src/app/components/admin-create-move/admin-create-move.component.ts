import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-move',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-create-move.component.html',
  styleUrl: './admin-create-move.component.css'
})
export class AdminCreateMoveComponent {
  moveName: string = '';
  errorMessage: string | null = null;
  validMoveName(): boolean {
    const trimmedMoveName = this.moveName.trim();

    if (!trimmedMoveName) {
      this.errorMessage = 'Worng Move name. Move name cannot be empty';
      return false;
    }

    if (trimmedMoveName.length >= 20) {
      this.errorMessage = 'Worng Move name. Move name cannot be longer than 15 characters';
      return false;
    }

    if (!/^[a-zA-Z0-9]*$/.test(trimmedMoveName)) {
      this.errorMessage = 'Worng Move name. Move name cannot contain special characters';
      return false;
    }

    return true;
  }
}
