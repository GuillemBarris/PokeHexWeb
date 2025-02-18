import { Router } from "express";
import { UpdateGame, DeleteGame, CreateGame, GetGameByUserId } from "../controllers/GameController.js";

const GameRoutes = Router();

GameRoutes.get("/getGameByUserId/:user_id", GetGameByUserId)
GameRoutes.post("/createGame", CreateGame)
GameRoutes.put("/updateGame/:id", UpdateGame)
GameRoutes.delete("/deleteGame/:id", DeleteGame)



export default  GameRoutes;
