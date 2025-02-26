import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trainer-pokemon-game',
  standalone: true,
  imports: [],
  templateUrl: './trainer-pokemon-game.component.html',
  styleUrl: './trainer-pokemon-game.component.css'
})
export class TrainerPokemonGameComponent implements OnInit {
  gameId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.gameId = params.get('gameId');
    });
  }
}