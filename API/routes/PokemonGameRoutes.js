import { Router } from "express";
import {createPokemonGame, updatePokemonGame, deletePokemonGame, getPokemonGameByIdGameAndBoxNumber, getPokemonGameByGameId  } from '../controllers/PokemonGameController.js';

const PokemonGame = Router();
PokemonGame.get('/getPokemonGameByIdGameAndBoxNumber/:game_id/:box_number/', getPokemonGameByIdGameAndBoxNumber);
PokemonGame.get('/getPokemonGameByGameId/:game_id', getPokemonGameByGameId);
PokemonGame.post('/createPokemonGame', createPokemonGame);
PokemonGame.put('/updatePokemonGame/:id', updatePokemonGame);
PokemonGame.delete('/deletePokemonGameByGameId/:game_id', deletePokemonGame);
export default PokemonGame;