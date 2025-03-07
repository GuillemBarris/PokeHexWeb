import { Router } from "express";
import {createPokemonGame, updatePokemonGame, deletePokemonGame, getPokemonGameByIdGameAndBoxNumber, getPokemonGameByGameId  } from '../controllers/PokemonGameController.js';
import { authenticateToken } from "../middleware/middleware.js";

const PokemonGame = Router();
PokemonGame.get('/getPokemonGameByIdGameAndBoxNumber/:game_id/:box_number/', authenticateToken, getPokemonGameByIdGameAndBoxNumber);
PokemonGame.get('/getPokemonGameByGameId/:game_id', authenticateToken, getPokemonGameByGameId);
PokemonGame.post('/createPokemonGame', authenticateToken,createPokemonGame);
PokemonGame.put('/updatePokemonGame/:id', authenticateToken, updatePokemonGame);
PokemonGame.delete('/deletePokemonGameByGameId/:game_id', authenticateToken, deletePokemonGame);
export default PokemonGame;