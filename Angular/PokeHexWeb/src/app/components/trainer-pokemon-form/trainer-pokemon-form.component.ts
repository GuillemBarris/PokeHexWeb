import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainer-pokemon-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainer-pokemon-form.component.html',
  styleUrl: './trainer-pokemon-form.component.css'
})
export class TrainerPokemonFormComponent implements OnInit {
  pokemons: any[] = [];
  selectedPokemon: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonService.getAllPokemons().subscribe(data => {
      if (data && data.pokemons) {
        this.pokemons = data.pokemons;
      }
    });
  }
}
