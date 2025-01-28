import { Router } from "express";
import { CreatePokemon } from "../controllers/PokemonController.js";

const PokemonRoutes = Router();

PokemonRoutes.post("/createPokemon/", CreatePokemon);

export default PokemonRoutes;