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
  boxNumber: number = 1;
  errorMessage: string | null = null;
  constructor(private route: ActivatedRoute, private token: Token, private pokemonGameService: PokemonGameService) {}

  ngOnInit(): void {
    this.token.TokenPresent(); 
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('gameId');
      if (this.gameId) {
        this.pokemonGameService.getPokemonGame(this.gameId, this.boxNumber).subscribe(pg => {
          this.pokemonGame = pg;
        } );
      } else {
        console.error('Game ID is null');
      }
    });
    
  }
  incrementBoxNumber(): void {
    if (this.boxNumber < 32) {
      this.boxNumber++;
      if (this.gameId) {
        this.pokemonGameService.getPokemonGame(this.gameId, this.boxNumber).subscribe(pg => {
          this.pokemonGame = pg;
        });
      }
    } else {
      this.errorMessage = 'Maximum box number reached';
    }
  }
  decrementBoxNumber(): void {
    if (this.boxNumber > 1) {
      this.boxNumber--;
      if (this.gameId) {
        this.pokemonGameService.getPokemonGame(this.gameId, this.boxNumber).subscribe(pg => {
          this.pokemonGame = pg;
        });
      }
    } else {
      this.errorMessage = 'Minimum box number reached';
    }
  }
}