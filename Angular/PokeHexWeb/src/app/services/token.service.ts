
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class Token {

    constructor(private router: Router) {}

    saveToken(data: any){
        if(data.token){
            localStorage.setItem('authToken', data.token);
        }
    }

    TokenPresent(){
        if(!localStorage.getItem('authToken')){
               this.router.navigate(['/login']);
        }
    }
}