import { Router } from "express";
import { createPokemonMove, deletePokemonMove, getPokemonMoveById, updatePokemonMove } from "../controllers/PokemonMoveController.js";

const PokemonMove = Router();
PokemonMove.get('/getPokemonMoveById/:id', getPokemonMoveById);
PokemonMove.post('/createPokemonMove/', createPokemonMove);
PokemonMove.put('/updatePokemonMove/:id', updatePokemonMove);
PokemonMove.delete('/deletePokemonMove/:pokemon_id', deletePokemonMove);

export default PokemonMove;