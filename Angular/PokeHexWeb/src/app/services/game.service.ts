import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from '../app.config';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  private table = 'games';

  constructor(private http: HttpClient, private router: Router) {}

  getGames(email: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Beare ${token}`,
    });
    return this.http
      .get<any>(`${API_URL}/${this.table}/GetGameByUserId/${email}`, { headers })
      .pipe(
        catchError((err) => {
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
            console.error('Error desconocido:', err.status);
          }
          return of(null);
        })
      );
  }

  postGame(game: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Beare ${token}`,
    });
    return this.http
      .post<any>(`${API_URL}/${this.table}/createGame`, game, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error adding pokemon:', err);

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
            console.error('Error desconocido:', err.status);
          }
          return of(null)
        })
      );
  }
  
  putGame(gameId: string, game: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
    return this.http
      .put<any>(`${API_URL}/${this.table}/updateGame/${gameId}`, game, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error updating game:', err);

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
            console.error('Error desconocido:', err.status);
          }
          return of(null);
        })
      );
  }

  deleteGame(gameId: string) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
    });
    return this.http
      .delete<any>(`${API_URL}/${this.table}/deleteGame/${gameId}`, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error deleting game:', err);

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
            console.error('Error desconocido:', err.status);
          }
          return of(null);
        })
      );
  }
}
