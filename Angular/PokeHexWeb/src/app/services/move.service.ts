import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

export class MoveService {
  private Url = 'http://172.24.59.209:3000/api/v1/moves';

  constructor(private http: HttpClient, private router: Router) {}

  postMove(move: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      authorization: `Beare ${token}`,
    });
    return this.http
      .post<any>(`${this.Url}/createMove`, move, { headers })
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
}
