export class PokemonGame {
    id: number;
    name: string;
    generation: number;
    region: string;

    constructor(id: number, name: string, generation: number, region: string) {
        this.id = id;
        this.name = name;
        this.generation = generation;
        this.region = region;
    }
}