export class Move {
    name: string;
    category: string;
    type: string;
    power: number;
    constructor( name: string, category: string, type: string, power: number) {
        this.name = name,
        this.category = category,
        this.type = type,
        this.power = power
    }
}