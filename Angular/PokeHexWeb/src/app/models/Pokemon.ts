import { IPokemon } from "../interfaces/IPokemon";

export class Pokemon implements IPokemon {
    name: string;
    generation: number;
    category: string;
    ps: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;

    constructor(
        name: string,
        generation: number,
        category: string,
        ps: number,
        attack: number,
        defense: number,
        spAttack: number,
        spDefense: number,
        speed: number
    ) {
        this.name = name;
        this.generation = generation;
        this.category = category;
        this.ps = ps;
        this.attack = attack;
        this.defense = defense;
        this.spAttack = spAttack;
        this.spDefense = spDefense;
        this.speed = speed;
    }
}
