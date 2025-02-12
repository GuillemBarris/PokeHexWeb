import { Component } from '@angular/core';
import { Token } from '../../services/token.service';
import { GameService } from '../../services/game.service';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { IGame } from '../../interfaces/IGame';
import { Game } from '../../models/Game';
import { FormsModule } from '@angular/forms';

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

  constructor(private token: Token, private gameService: GameService) {}

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
  
    const newGame = new Game(this.name, this.user_id);
  
    this.gameService.postGame(newGame)
      .pipe(
        tap((data) => {
          console.log('Game added:', data);
        }),
        catchError((error) => {
          console.error('Error adding the game:', error);
          return of(null);
        })
      ).subscribe();
  }
}
