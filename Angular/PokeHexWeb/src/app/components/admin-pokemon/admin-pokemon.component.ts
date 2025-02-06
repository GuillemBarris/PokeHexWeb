import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pokemon.component.html',
  styleUrl: './admin-pokemon.component.css'
})
export class AdminPokemonComponent {

  pokemons: any[] = [];
  number: number = 0;
  offset: number = 0;
  limit: number = 0;
  errorMessage: string | null = null;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(this.number).subscribe(pl => {
      this.pokemons = pl.pokemons;
      this.offset = pl.offset;
      this.limit = pl.limit;
    });
  }

  incrementNumber() {

    const originalNumber = this.number;
  
    this.number += 31;
  
    this.pokemonService.getPokemons(this.number).subscribe(
      pl => {
        if (pl.pokemons.length <= 0) {
          this.number = originalNumber;
          this.errorMessage = 'There are no more Pokémons to load.';
        } else {
          this.pokemons = pl.pokemons;
          this.offset = pl.offset;
          this.limit = pl.limit;
        }
      },
      error => {
        this.number = originalNumber;
        this.errorMessage = 'Failed to load Pokémons.';
      }
    );
  
    return this.number;
  }
}
    