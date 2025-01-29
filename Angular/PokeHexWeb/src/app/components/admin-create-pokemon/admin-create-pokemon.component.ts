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

  validPokemonName(): boolean {
    const trimmedPokemonName = this.pokemonName.trim();

    if (!trimmedPokemonName) {
      return false;
    }

    if (trimmedPokemonName.length >= 15) {
      return false;
    }

    if (!/^[a-zA-Z0-9]*$/.test(trimmedPokemonName)) {
      return false;
    }

    return true;
  }

}
