import { Component } from '@angular/core';
import { Token } from '../../services/token.service';
import { GameService } from '../../services/game.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-trainer-home',
  standalone: true,
  imports: [],
  templateUrl: './trainer-home.component.html',
  styleUrl: './trainer-home.component.css',
})
export class TrainerHomeComponent {
  UserId = localStorage.getItem('email');

  constructor(private token: Token, private gameService: GameService) {}

  ngOnInit() {
    this.token.TokenPresent(); 
  
    if (this.UserId) {
      this.gameService.getGames(this.UserId).pipe(
        tap((data) => {
          console.log('Datos recibidos:', data);
        }),
        catchError((error) => {
          console.error('Error al obtener los juegos:', error);
          return of(null);
        })
      ).subscribe()
    }
  }
}
