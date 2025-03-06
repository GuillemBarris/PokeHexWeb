import { Router } from "express";
import { CreatePokemon, GetPokemon } from "../controllers/PokemonController.js";
import { authenticateToken } from "../middleware/middleware.js";

const PokemonRoutes = Router();

PokemonRoutes.post("/createPokemon/", authenticateToken,  CreatePokemon);
PokemonRoutes.get("/getPokemons/:offset",   authenticateToken, GetPokemon);
PokemonRoutes.get("/getAllPokemons/",   authenticateToken, GetPokemon);

export default PokemonRoutes;