import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PokemonGameService {
  private Url = 'http://172.24.59.209:3000/api/v1/pokemonGame';

  constructor(private http: HttpClient, private router: Router) {}

  postPokemonGame(pokemonGame: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
    return this.http
      .post<any>(`${this.Url}/createPokemonGame/`, pokemonGame, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error adding pokemon game:', err);

          if (err.status === 400) {
            console.error('Error 400: Bad Request');
          } else if (err.status === 401) {
            console.error('Error 401: Unauthorized Token');
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            console.error('Error 403: Forbidden Token');
            this.router.navigate(['/login']);
          } else if (err.status === 500) {
            console.error('Error 500: Internal Server Error');
          } else {
            console.error('Unknown error:', err.status);
          }

          return of(null);
        })
      );
  }

  getPokemonGame(gameId: string, boxNumber: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
    return this.http
      .get<any>(`${this.Url}/getPokemonGame${gameId}?boxNumber=${boxNumber}`, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error fetching pokemon game:', err);

          if (err.status === 400) {
            console.error('Error 400: Bad Request');
          } else if (err.status === 401) {
            console.error('Error 401: Unauthorized Token');
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            console.error('Error 403: Forbidden Token');
            this.router.navigate(['/login']);
          } else if (err.status === 500) {
            console.error('Error 500: Internal Server Error');
          } else {
            console.error('Unknown error:', err.status);
          }

          return of(null);
        })
      );
  }
}
