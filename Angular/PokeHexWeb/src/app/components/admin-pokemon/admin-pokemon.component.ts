import { Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { Token } from '../../services/token.service';
import { IPokemon } from '../../interfaces/IPokemon';

@Component({
  selector: 'app-admin-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-pokemon.component.html',
  styleUrl: './admin-pokemon.component.css'
})
export class AdminPokemonComponent {

  pokemons: IPokemon[] = [];
  number: number = 0;
  offset: number = 0;
  limit: number = 0;
  errorMessage: string | null = null;
  constructor(private pokemonService: PokemonService, private token: Token) {}

  ngOnInit(): void {
    this.token.TokenPresent();
    this.pokemonService.getPokemons(this.number).subscribe(pl => {
      this.pokemons = pl.pokemons;
      this.offset = pl.offset;
      this.limit = pl.limit;
    });
   
  }

  incrementNumber() {

    const originalNumber = this.number;
  
    this.number += 31;
  
    this.pokemonService.getPokemons(this.number).pipe(
      tap((p1) => {
        if (p1.pokemons.length <= 0) {
          this.number = originalNumber;
          this.errorMessage = 'There are no more Pokémons to load.';
        } else {
          this.pokemons = p1.pokemons
          this.offset = p1.offset;
          this.limit = p1.limit;
        }
      }),
      catchError((error) => {
        this.number = originalNumber;
        this.errorMessage = 'Failed to load Pokémons.';
        return of(null);
      }
    )).subscribe();
 
  
    return this.number;
  }

  decrementNumber() {
    const originalNumber = this.number;
    this.number -= 31;
    this.pokemonService.getPokemons(this.number).pipe(
      tap((p1) => {
        if(p1.pokemons.length <= 0) {
          this.number = originalNumber;
          this.errorMessage = 'There are no more Pokémons to load.';
        }else {
          this.pokemons = p1.pokemons
          this.offset = p1.offset;
          this.limit = p1.limit;
        }
      }),
      catchError((error) => {
        this.number = originalNumber;
        this.errorMessage = 'Failed to load Pokémons.';
        return of(null);
      }
    )).subscribe();

    return this.number;
  }
}
    