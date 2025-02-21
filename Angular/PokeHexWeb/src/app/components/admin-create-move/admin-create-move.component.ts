import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Token } from '../../services/token.service';
import { MoveService } from '../../services/move.service';
import { catchError, of, tap } from 'rxjs';
import { Move } from '../../models/Move';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-create-move',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-create-move.component.html',
  styleUrl: './admin-create-move.component.css'
})
export class AdminCreateMoveComponent {

  constructor(private token: Token, private moveService: MoveService) { }

  moves: Move[] = [];
  moveName: string = '';
  category: string = '';
  type: string = '';
  power: number = 0;
  errorMessage: string | null = null;

  ngOnInit() {
    this.token.TokenPresent();
  }

createMove(): void {
  if (!this.validMoveName() || !this.validCategory() || !this.validType() || !this.validPower()) {
    return;
  } else if (this.validMoveName() == false || this.validCategory() == false || this.validType() == false || this.validPower() == false) {
    return;
  } else if (this.validMoveName() == true && this.validCategory() == true && this.validType() == true && this.validPower() == true) {
    this.errorMessage = "The move has been created";
    const newMove = {
      name: this.moveName,
      category: this.category,
      type: this.type,
      power: this.power
    };

    this.moveService
      .postMove(newMove)
      .pipe(
        tap((response) => {
          console.log('Move added:', response);
          this.moves.push(response);
        }),
        catchError((error) => {
          console.error('Error adding move:', error);
          return of(null);
        })
      )
      .subscribe();
  }
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

  validCategory(): boolean {  
    if (this.category === '') {
      this.errorMessage = 'Worng Move category. Move category cannot be empty';
      return false;
    }

    return true;
  }

  validType(): boolean {
    if (this.type === '') {
      this.errorMessage = 'Worng Move type. Move type cannot be empty';
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
