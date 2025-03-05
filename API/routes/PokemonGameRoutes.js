import { Router } from "express";
import {createPokemonGame, updatePokemonGame, deletePokemonGame, getPokemonGameByIdGameAndBoxNumber  } from '../controllers/PokemonGameController.js';

const PokemonGame = Router();
PokemonGame.get('/getPokemonGameByIdGameAndBoxNumber/:game_id/:box_number/', getPokemonGameByIdGameAndBoxNumber);
PokemonGame.post('/createPokemonGame', createPokemonGame);
PokemonGame.put('/updatePokemonGame/:id', updatePokemonGame);
PokemonGame.delete('/deletePokemonGame/:id', deletePokemonGame);
export default PokemonGame;