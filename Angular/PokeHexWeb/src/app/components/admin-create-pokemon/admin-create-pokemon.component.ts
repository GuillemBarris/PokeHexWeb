import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-admin-create-pokemon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-create-pokemon.component.html',
  styleUrl: './admin-create-pokemon.component.css'
})
export class AdminCreatePokemonComponent {

  constructor(private pokemonService: PokemonService, private router: Router) {}

  pokemon: any[] = [{}];
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
  validPokemonGeneration(): boolean {
    if (this.generation <= 0) {
        this.errorMessage = 'Worng generation. Generation must be greater than 0';
        return false;
    }
    if (this.generation > 2) {
        this.errorMessage = 'Worng generation. Generation must be less than 1000';
        return false;
    }
    if (!this.generation) {
        return false;
    }
    return true;
}

validPokemonCategory(): boolean {
    const trimmedCategory = this.category.trim();

    if (!trimmedCategory) {
        this.errorMessage = 'Worng category. Category cannot be empty';
        return false;
    }
    if (trimmedCategory.length > 25) {
        this.errorMessage = 'Worng category. Category cannot be longer than 25 characters';
        return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(trimmedCategory)) {
        this.errorMessage = 'Worng category. Category can only contain letters and numbers';
        return false;
    }
    return true;
}

validPokemonPs(): boolean {
    if (this.ps < 0 || this.ps > 255) {
        this.errorMessage = 'Worng Ps. Ps must be between 0 and 255';
        return false;
    }
    return true;
}

validPokemonAttack(): boolean {
    if (this.attack < 0 || this.attack > 255) {
        this.errorMessage = 'Worng Attack. Attack must be between 0 and 255';
        return false;
    }
    return true;
}

validPokemonDefense(): boolean {
    if (this.defense < 0 || this.defense > 255) {
        this.errorMessage = 'Worng Defense. Defense must be between 0 and 255';
        return false;
    }
    return true;
}

validPokemonSpAttack(): boolean {
    if (this.spAttack < 0 || this.spAttack > 255) {
        this.errorMessage = 'Worng SpAttack. SpAttack must be between 0 and 255';
        return false;
    }
    return true;
}

validPokemonSpDefense(): boolean {
    if (this.spDefense < 0 || this.spDefense > 255) {
        this.errorMessage = 'Worng SpDefense. SpDefense must be between 0 and 255';
        return false;
    }
    return true;
}

validPokemonSpeed(): boolean {
    if (this.speed < 0 || this.speed > 255) {
        this.errorMessage = 'Worng Speed. Speed must be between 0 and 255';
        return false;
    }
    return true;
}

createPokemon(): void {
    if (!this.validPokemonName() || !this.validPokemonGeneration() || !this.validPokemonCategory() || !this.validPokemonPs() || !this.validPokemonAttack() || !this.validPokemonDefense() || !this.validPokemonSpAttack() || !this.validPokemonSpDefense() || !this.validPokemonSpeed()) {
        return;
    } else if  (this.validPokemonName() == false || this.validPokemonGeneration() == false || this.validPokemonCategory() == false || this.validPokemonPs() == false || this.validPokemonAttack() == false || this.validPokemonDefense() == false || this.validPokemonSpAttack() == false || this.validPokemonSpDefense() == false || this.validPokemonSpeed() == false) {
        return;
    } else if (this.validPokemonName() == true && this.validPokemonGeneration() == true && this.validPokemonCategory() == true && this.validPokemonPs() == true && this.validPokemonAttack() == true && this.validPokemonDefense() == true && this.validPokemonSpAttack() == true && this.validPokemonSpDefense() == true && this.validPokemonSpeed() == true) {
      this.errorMessage = "The pokemon has been created";
      const newPokemon = {
        name: this.pokemonName,
        generation: this.generation,
        category: this.category,
        ps: this.ps,
        attack: this.attack,
        defense: this.defense,
        spAttack: this.spAttack,
        spDefense: this.spDefense,
        speed: this.speed,
      };
      this.pokemonService
        .postPokemon(newPokemon)
        .pipe(
          tap((response) => {
            console.log('Pokemon added:', response);
            this.pokemon.push(response);
          }),
          catchError((error) => {
            console.error('Error adding pokemon:', error);
            return of(null);
          })
        )
        .subscribe();

    }
}

}
