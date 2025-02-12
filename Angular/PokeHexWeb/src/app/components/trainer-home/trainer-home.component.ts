import { Component } from '@angular/core';
import { Token } from '../../services/token.service';
import { GameService } from '../../services/game.service';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trainer-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainer-home.component.html',
  styleUrl: './trainer-home.component.css',
})
export class TrainerHomeComponent {

  game: any[] = [];
  UserId = localStorage.getItem('email');

  constructor(private token: Token, private gameService: GameService) {}

  ngOnInit() {
    this.token.TokenPresent(); 
  
    if (this.UserId) {
      this.gameService.getGames(this.UserId).subscribe(games => {
        this.game = games;
       
      })
     
    }
  }
}
