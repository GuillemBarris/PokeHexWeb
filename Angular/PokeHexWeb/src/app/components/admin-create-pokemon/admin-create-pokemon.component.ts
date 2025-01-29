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
  generation: number = 1;
  category: string = '';
  ps: number = 0;
  attack: number = 0;
  defense: number = 0;
  spAttack: number = 0;
  spDefense: number = 0;
  speed: number = 0;

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
  validPokemonGeneration() {
    

    if (!this.generation) {
      return false;
    }
    if (this.generation > 2) {
      return false;
    }
    if (this.generation <= 0 ) {
      return false;
    }
    return true;
  }


  validPokemonCategory(): boolean {
    const trimmedCategory = this.category.trim();

    if (!trimmedCategory) {
      return false;
    }
    if(trimmedCategory.length > 26) {
      return false;
    }
    if (!/^[a-zA-Z0-9]*$/.test(trimmedCategory)) {
      return false;
    }
    return true;
  }

  validPokemonPs(): boolean {
    if (this.ps < 0 || this.ps > 255) {
      return false;
    }
    return true;
  }

  validPokemonAttack(): boolean {
    if (this.attack < 0 || this.attack > 255) {
      return false;
    }
    return true;
  }

  validPokemonDefense(): boolean {
    if (this.defense < 0 || this.defense > 255) {
      return false;
    }
    return true;
  }

  validPokemonSpAttack(): boolean {
    if (this.spAttack < 0 || this.spAttack > 255) {
      return false;
    }
    return true;
  }

  validPokemonSpDefense(): boolean {
    if (this.spDefense < 0 || this.spDefense > 255) {
      return false;
    }
    return true;
  }

  validPokemonSpeed(): boolean {
    if (this.speed < 0 || this.speed > 255) {
      return false;
    }
    return true;
  }


}
