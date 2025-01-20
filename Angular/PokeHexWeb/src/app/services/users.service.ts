import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private Url = 'http://172.21.46.184:3000/api/v1/users'; 

    constructor(private http: HttpClient) { }

    postUser(user: any): Observable<any> {
        return this.http.post<any>(`${this.Url}/createUser/`, user).pipe(
            catchError((err) => {
                console.error('Error adding user:', err);
                return of(null)
            })
        )
    }

}