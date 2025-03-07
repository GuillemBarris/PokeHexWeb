import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { API_URL } from '../app.config';

@Injectable({
    providedIn: 'root',
})
export class PokemonMoveService {
    private table = 'pokemonMove';

    constructor(private http: HttpClient, private router: Router) {}

    postPokemonMove(pokemonMove: any) {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            authorization: `Bearer ${token}`,
        });
        return this.http.post<any>(`${API_URL}/${this.table}/createPokemonMove/`, pokemonMove, { headers }).pipe(
            catchError((err) => {
                console.error('Error adding pokemon move:', err);

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
    updatePokemonMove(pokemonMoveId: string, pokemonMove: any) {

        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            authorization: `Bearer ${token}`,
        });
        return this.http.put<any>(`${API_URL}/${this.table}/updatePokemonMove/${pokemonMoveId}`, pokemonMove, { headers }).pipe(
            catchError((err) => {
                console.error('Error updating pokemon move:', err);

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

    deletePokemonMove(pokemonMoveId: string) {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            authorization: `Bearer ${token}`,
        });
        return this.http.delete<any>(`${API_URL}/${this.table}/deletePokemonMove/${pokemonMoveId}`, { headers }).pipe(
            catchError((err) => {
                console.error('Error deleting pokemon move:', err);

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

    getPokemonMovesById(Id: string) {

        
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders({
            authorization: `Bearer ${token}`,
        });

        return this.http.get<any>(`${API_URL}/${this.table}/getPokemonMoveById/${Id}`, { headers }).pipe(
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
                    console.error('Unknown error:', err.status);
                }
                return of(null);
            })
        );
    }

}