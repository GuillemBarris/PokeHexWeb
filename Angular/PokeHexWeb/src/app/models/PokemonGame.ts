export class PokemonGame {
    id: string | undefined;
    pokemon_id: string | undefined;
    game_id: string;
    box_number: number;
    location_in_box: number;

    constructor(id: string | undefined, pokemon_id: string | undefined, game_id: string, box_number: number, location_in_box: number) {
        this.id = id;
        this.pokemon_id = pokemon_id;
        this.game_id = game_id;
        this.box_number = box_number;
        this.location_in_box = location_in_box;
    }
}