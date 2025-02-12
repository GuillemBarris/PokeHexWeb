import { IGame } from "../interfaces/IGame";

export class Game implements IGame {
    name: string;
    user_id: string;

    constructor( name: string, user_id:string){
        this.name = name,
        this.user_id = user_id
    }
}