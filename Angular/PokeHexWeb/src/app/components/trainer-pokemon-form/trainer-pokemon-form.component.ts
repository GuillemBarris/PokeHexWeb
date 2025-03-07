import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { MoveService } from '../../services/move.service';
import { PokemonGameService } from '../../services/pokemongame.service';
import { PokemonMoveService } from '../../services/pokemonmove.service';
import { catchError, forkJoin, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-trainer-pokemon-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainer-pokemon-form.component.html',
  styleUrls: ['./trainer-pokemon-form.component.css']
})
export class TrainerPokemonFormComponent implements OnInit {
  pokemonGame: any; 
  pokemons: any[] = []; 
  moves: any[] = []; 
  selectedPokemon: string = '';
  selectedMove1: string = ''; 
  selectedMove2: string = '';
  selectedMove3: string = ''; 
  selectedMove4: string = '';

  constructor( private pokemonService: PokemonService,  private moveService: MoveService,  private pokemonGameService: PokemonGameService, private pokemonMoveService: PokemonMoveService
  ) {}

  ngOnInit(): void {
    this.pokemonGame = history.state.pokemonGame;
    console.log('Pokemon Game:', this.pokemonGame);
    this.loadPokemons();
    this.loadMoves();
  }
  loadPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe((data) => {
      if (data && data.pokemons) {
        this.pokemons = data.pokemons;
      }
    });
  }
  loadMoves(): void {
    this.moveService.getAllMoves().subscribe((data) => {
      this.moves = data;
    });
  }


  updatePokemonGameAndMove(): void {
    if (!this.selectedMove1 || !this.selectedMove2 || !this.selectedMove3 || !this.selectedMove4) {
      alert('Por favor, selecciona 4 movimientos.');
      return;
    }
  
    const pokemonData = {
      pokemon_id: this.selectedPokemon,
    };
  
    const id = this.pokemonGame.id;
  
    this.pokemonGameService.updatePokemonGame(id, pokemonData).pipe(
      switchMap((response) => {
        console.log('Pokemon Game actualizado correctamente:', response);
        const moves = [this.selectedMove1, this.selectedMove2, this.selectedMove3, this.selectedMove4];
        return this.updatePokemonMoves(id, moves);
      }),
      catchError((error) => {
        console.error('Error al actualizar el Pokemon Game:', error);
        alert('Error al actualizar el Pokemon Game.');
        return of(null); 
      })
    ).subscribe();
  }
  
  updatePokemonMoves(pokemonGameId: string, moves: string[]): Observable<any> {
    return forkJoin(
      moves.map((move, index) => {
        const moveData = {
          pokemon_id: pokemonGameId,
          move_id: move,
        };
  
        return this.pokemonMoveService.getPokemonMovesById(pokemonGameId).pipe(
          switchMap((existingMoves: any[]) => {
            const existingMove = existingMoves.find((m) => m.slot === index + 1);
  
            if (existingMove) {
              return this.pokemonMoveService.updatePokemonMove(existingMove.id, moveData).pipe(
                tap((updateResponse) => {
                  console.log(`Movimiento ${index + 1} actualizado correctamente:`, updateResponse);
                }),
                catchError((updateError) => {
                  console.error(`Error al actualizar el movimiento ${index + 1}:`, updateError);
                  return of(null); 
                }
              ));
            } else {
              return this.pokemonMoveService.postPokemonMove(moveData).pipe(
                tap((createResponse) => {
                  console.log(`Movimiento ${index + 1} creado correctamente:`, createResponse);
                }),
                catchError((createError) => {
                  console.error(`Error al crear el movimiento ${index + 1}:`, createError);
                  return of(null); 
                })
              );
            }
          }),
          catchError((error) => {
            console.error('Error al obtener los movimientos existentes:', error);
            return of(null); 
          })
        );
      })
    );
  }
}