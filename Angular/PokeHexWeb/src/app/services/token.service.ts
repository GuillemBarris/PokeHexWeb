
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class Token {

    saveToken(data: any){
        if(data.token){
            localStorage.setItem('authToken', data.token);
        }
    }
}