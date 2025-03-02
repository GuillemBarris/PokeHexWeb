import { IGame } from "../interfaces/IGame";

export class Game implements IGame {
    id: string | undefined;
    name: string;
    user_id: string;

    constructor( id: string | undefined, name: string, user_id:string){
        this.id = id,
        this.name = name,
        this.user_id = user_id
    }
}