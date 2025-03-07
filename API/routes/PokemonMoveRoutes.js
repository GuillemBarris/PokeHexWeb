import { Router } from "express";
import { createPokemonMove, deletePokemonMove, getPokemonMoveById, updatePokemonMove } from "../controllers/PokemonMoveController.js";
import { authenticateToken } from "../middleware/middleware.js";

const PokemonMove = Router();
PokemonMove.get('/getPokemonMoveById/:id', authenticateToken, getPokemonMoveById);
PokemonMove.post('/createPokemonMove/',  authenticateToken, createPokemonMove);
PokemonMove.put('/updatePokemonMove/:id', authenticateToken, updatePokemonMove);
PokemonMove.delete('/deletePokemonMove/:pokemon_id', authenticateToken,  deletePokemonMove);

export default PokemonMove;