import { Router } from "express";
const PokemonGame = Router();
PokemonGame.get('/getPokemonGameByIdGame/:game_id', getPokemonGameByIdGame);
PokemonGame.post('/createPokemonGame', createPokemonGame);
export default PokemonGame;