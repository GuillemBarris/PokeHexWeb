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

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons(31).subscribe(pokemons => {
      this.pokemons = pokemons;
    });
  }


}
