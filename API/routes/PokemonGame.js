import { Router } from "express";
const PokemonGame = Router();
PokemonGame.get('/getPokemonGameByIdGame/:game_id', getPokemonGameByIdGame);
export default PokemonGame;