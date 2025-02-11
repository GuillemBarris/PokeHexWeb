import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PokemonService {

    private Url = 'http://172.24.59.209:3000/api/v1/pokemons';

    constructor(private http: HttpClient) { }

    postPokemon(pokemon: any) {
        const token = localStorage.getItem('authToken'); 
        const headers = new HttpHeaders({

            'authorization': `Beare ${token}`,
        });
        return this.http.post<any>(`${this.Url}/createPokemon/`, pokemon, {headers}).pipe(
            catchError((err) => {
                console.error('Error adding pokemon:', err);
                return of(null)
            })
        )
    }

    getPokemons(number: number) {
       
        const token = localStorage.getItem('authToken'); 
        const headers = new HttpHeaders({

            'authorization': `Beare ${token}`,
        });

        return this.http.get<any>(`${this.Url}/getPokemons/${number}`, { headers }).pipe(
            catchError((err) => {
                console.error('Error getting pokemons:', err);
                return of(null); 
            })
        );
    }


}