import { Component } from '@angular/core';
import { Token } from '../../services/token.service';
import { GameService } from '../../services/game.service';
import { catchError, finalize, forkJoin, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IGame } from '../../interfaces/IGame';
import { Game } from '../../models/Game';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PokemonGame } from '../../models/PokemonGame';
import { PokemonGameService } from '../../services/pokemongame.service';

@Component({
  selector: 'app-trainer-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './trainer-home.component.html',
  styleUrl: './trainer-home.component.css',
})
export class TrainerHomeComponent {

  games: IGame[] = []; 
  user_id = localStorage.getItem('email');
  name: string = '';
  isCreatingPokemons = false;
  constructor(private token: Token, private gameService: GameService, private pokemonGameService: PokemonGameService, private router: Router) {}

  ngOnInit() {
    this.token.TokenPresent(); 
  
    if (this.user_id){
      this.gameService.getGames(this.user_id).subscribe(games => {

        this.games = games

        
        
      });
    }
  }

  createNewGame() {
    if (!this.name || this.name.trim() === '') {
      console.error('The game name cannot be empty.');
      return;
    }
  
    if (!this.user_id) {
      console.error('The user_id is not defined.');
      return;
    }
  
    const newGame = new Game(undefined, this.name, this.user_id);
  
    this.gameService.postGame(newGame)
      .pipe(
        tap((data) => {
          console.log('Game added:', data);
          this.createPokemonsGame(data.id);
          
        }),
        catchError((error) => {
          console.error('Error adding the game:', error);
          return of(null);
        })
      ).subscribe();
     
  }

  updateGame( game: Game) {
    if (!game.id) {
      console.error('The game ID is not defined.');
      return;
    }
  
    this.gameService.putGame(game.id, game)
      .pipe(
        tap((data) => {
          console.log('Game updated:', data);
        }),
        catchError((error) => {
          console.error('Error updating the game:', error);
          return of(null);
        })
      ).subscribe();
  }

  deleteGame( game: Game) {
    if (!game.id) {
      console.error('The game ID is not defined.');
      return;
    }
    this.gameService.deleteGame(game.id)
      .pipe(
        tap((data) => {
          console.log('Game deleted:', data);
        }),
        catchError((error) => {
          console.error('Error deleting the game:', error);
          return of(null);
        })
      ).subscribe();
  }

  goToGame(game: Game) {
    this.router.navigate(['/trainer-pokemon-game', game.id]);
}

createPokemonsGame(gameId: string) {
  if (!gameId) {
    console.error('The game ID is not defined.');
    return;
  }

  // Deshabilitar el botón
  this.isCreatingPokemons = true;

  const requests = [];

  // Crear todas las solicitudes
  for (let i = 1; i <= 32; i++) {
    for (let j = 1; j <= 30; j++) {
      const newPokemonGame = new PokemonGame(undefined, undefined, gameId, i, j);
      const request = this.pokemonGameService.postPokemonGame(newPokemonGame).pipe(
        catchError((error) => {
          console.error('Error adding the pokemon:', error);
          return of(null); // Continuar incluso si hay un error
        })
      );
      requests.push(request);
    }
  }


  forkJoin(requests)
    .pipe(
      finalize(() => {

        this.isCreatingPokemons = false;
        console.log('All Pokemons have been created.');
      })
    )
    .subscribe((results) => {
      console.log('All requests completed:', results);
    });
}
}


