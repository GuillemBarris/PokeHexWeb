import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class PokemonGameService {
 private table = 'pokemonGame';

  constructor(private http: HttpClient, private router: Router) {}

  postPokemonGame(pokemonGame: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
    return this.http
      .post<any>(`${API_URL}/${this.table}/createPokemonGame/`, pokemonGame, { headers })
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
      .get<any>(`${API_URL}/${this.table}/getPokemonGameByIdGameAndBoxNumber/${gameId}/${boxNumber}/`, { headers })
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

  updatePokemonGame(id: string, updatedData: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });

    return this.http
      .put<any>(`${API_URL}/${this.table}/updatePokemonGame/${id}`, updatedData, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error updating pokemon game:', err);

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

  deletePokemonGame(gameId: string, boxNumber: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
  
    return this.http
      .delete<any>(`${API_URL}/${this.table}/deletePokemonGame/${gameId}/${boxNumber}/`, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error deleting pokemon game:', err);
  
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
