import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-create-pokemon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-create-pokemon.component.html',
  styleUrl: './admin-create-pokemon.component.css'
})
export class AdminCreatePokemonComponent {

  pokemonName: string = '';
  errorMessage: string | null = null;

  validPokemonName(): boolean {
    const trimmedPokemonName = this.pokemonName.trim();

    if (!trimmedPokemonName) {
      this.errorMessage = 'Worng Pokemon name. Pokemon name cannot be empty';
      return false;
    }

    if (trimmedPokemonName.length >= 15) {
      this.errorMessage = 'Worng Pokemon name. Pokemon name cannot be longer than 15 characters';
      return false;
    }

    if (!/^[a-zA-Z0-9]*$/.test(trimmedPokemonName)) {
      this.errorMessage = 'Worng Pokemon name. Pokemon name cannot contain special characters';
      return false;
    }

    return true;
  }

}
