import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, of } from "rxjs";
@Injectable({
    providedIn:'root'
})

export class GameService {

   
    private Url = 'http://172.24.59.209:3000/api/games';

    constructor(private http: HttpClient) { }
    getGames(email: string){
        const token = localStorage.getItem('authToken'); 
        const headers = new HttpHeaders({

            'authorization': `Beare ${token}`,
        });
        return this.http.get<any>(`${this.Url}/GetGameByUserId/${email}`, {headers}).pipe(
            catchError((err) =>{
                  console.error('Error getting pokemons:', err);
                  return of(null)
                  
            } )
        )
    }

    

}