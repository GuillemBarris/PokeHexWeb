import { Router } from "express";
import {createPokemonGame, updatePokemonGame, deletePokemonGame, getPokemonGameByIdGame } from '../controllers/PokemonGameController.js';

const PokemonGame = Router();
PokemonGame.get('/getPokemonGameByIdGame/:game_id', getPokemonGameByIdGame);
PokemonGame.post('/createPokemonGame', createPokemonGame);
PokemonGame.put('/updatePokemonGame/:id', updatePokemonGame);
PokemonGame.delete('/deletePokemonGame/:id', deletePokemonGame);
export default PokemonGame;