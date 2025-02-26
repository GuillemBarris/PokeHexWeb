import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Token } from '../../services/token.service';
import { PokemonGameService } from '../../services/pokemongame.servie';
import { PokemonGame } from '../../models/PokemonGame';

@Component({
  selector: 'app-trainer-pokemon-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer-pokemon-game.component.html',
  styleUrl: './trainer-pokemon-game.component.css'
})
export class TrainerPokemonGameComponent implements OnInit {
  gameId: string | null = null;
  pokemonGame: PokemonGame[] = [];

  constructor(private route: ActivatedRoute, private token: Token, private pokemonGameService: PokemonGameService) {}

  ngOnInit(): void {
    this.token.TokenPresent(); 
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.pokemonGameService.getPokemonGame(this.gameId, 1).subscribe(pg => {
          this.pokemonGame = pg;
        } );
      } else {
        console.error('Game ID is null');
      }
    });
    
  }
}