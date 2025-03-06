import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoveService } from '../../services/move.service';

@Component({
  selector: 'app-trainer-pokemon-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainer-pokemon-form.component.html',
  styleUrl: './trainer-pokemon-form.component.css'
})
export class TrainerPokemonFormComponent implements OnInit {
  pokemons: any[] = [];
  moves: any[] = [];
  selectedPokemon: string = '';
  selectedMove: string = '';

  constructor(private pokemonService: PokemonService, private moveService: MoveService) {}

  ngOnInit() {
    this.loadPokemons();
    this.loadMoves();

  }

  loadPokemons() {
    this.pokemonService.getAllPokemons().subscribe(data => {
      if (data && data.pokemons) {
        this.pokemons = data.pokemons;
      }
    });
  }
  loadMoves() {
    this.moveService.getAllMoves().subscribe(data => {
     
        this.moves = data;
      
    }
  );
    
  }
}
