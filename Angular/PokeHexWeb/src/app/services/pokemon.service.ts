import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class PokemonService {

    private Url = 'http://172.24.59.209:3000/api/v1/pokemons';

    constructor(private http: HttpClient) { }

    postPokemon(pokemon: any) {
        return this.http.post<any>(`${this.Url}/createPokemon/`, pokemon).pipe(
            catchError((err) => {
                console.error('Error adding pokemon:', err);
                return of(null)
            })
        )
    }

    getPokemons() {
        return this.http.get<any>(`${this.Url}/getPokemons/`).pipe(
            catchError((err) => {
                console.error('Error getting pokemons:', err);
                return of(null)
            })
        )
    }


}