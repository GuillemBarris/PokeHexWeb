import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { API_URL } from "../app.config";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private table = 'users';

    constructor(private http: HttpClient) { }

    postUser(user: any): Observable<any> {
        return this.http.post<any>(`${API_URL}/${this.table}/createUser/`, user).pipe(
            catchError((err) => {
                console.error('Error adding user:', err);
                return of(null)
            })
        )
    }

    getUserByEmailAndPassword(email: string, password: string): Observable<any> {
        return this.http.get<any>(`${API_URL}/${this.table}/getUserByEmail/${email}/${password}`).pipe(
            catchError((err) => {
                console.error('Error getting user:', err);
                return of(null)
            
            })
        )
    }

}
