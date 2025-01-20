import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private Url = 'http://172.21.46.184:3000/api/v1/users'; 

    constructor(private http: HttpClient) { }

}