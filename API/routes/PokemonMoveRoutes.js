import { Router } from "express";
import { createPokemonMove, deletePokemonMove, getAllPokemonMoves, getPokemonMoveById, updatePokemonMove } from "../controllers/PokemonMoveController.js";

const PokemonMove = Router();
PokemonMove.get('getAllPokemonMoves/', getAllPokemonMoves);
PokemonMove.get('getPokemonMoveByID/:id', getPokemonMoveById);
PokemonMove.post('createPokemonMove/', createPokemonMove);
PokemonMove.put('updatePokemnMove/:id', updatePokemonMove);
PokemonMove.delete('deletePokemonMove/:id', deletePokemonMove);

export default PokemonMove;