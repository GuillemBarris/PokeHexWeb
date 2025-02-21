import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Token } from '../../services/token.service';

@Component({
  selector: 'app-admin-create-move',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-create-move.component.html',
  styleUrl: './admin-create-move.component.css'
})
export class AdminCreateMoveComponent {

  constructor(private token: Token) { }

  moveName: string = '';
  category: string = '';
  type: string = '';
  power: number = 0;
  errorMessage: string | null = null;

  ngOnInit() {
    this.token.TokenPresent();
  }

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

  validPower(): boolean {
    if (this.power < 0 || this.power > 250) {
      this.errorMessage = 'Worng Move power. Move power must be between 0 and 100';
      return false;
    }

    return true;
  }
}
