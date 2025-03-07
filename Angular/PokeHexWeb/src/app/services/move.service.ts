import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class MoveService {
  private table = 'moves';

  constructor(private http: HttpClient, private router: Router) {}

  postMove(move: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Beare ${token}`,
    });
    return this.http
      .post<any>(`${API_URL}/${this.table}/createMove`, move, { headers })
      .pipe(
        catchError((err) => {
          console.error('Error adding move:', err);

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
  getAllMoves() {
    const token = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders({
        'authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(`${API_URL}/${this.table}/getAllMoves/`, { headers }).pipe(
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
}
