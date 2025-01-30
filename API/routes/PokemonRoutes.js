import { Router } from "express";
import { CreatePokemon, GetPokemon } from "../controllers/PokemonController.js";

const PokemonRoutes = Router();

PokemonRoutes.post("/createPokemon/", CreatePokemon);
PokemonRoutes.get("/getPokemons/", GetPokemon);

export default PokemonRoutes;