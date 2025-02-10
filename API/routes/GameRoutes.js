import { Router } from "express";
import { CreateGame, GetGameByUserId } from "../controllers/GameController.js";

const GameRoutes = Router();

GameRoutes.get("/getGameByUserId/:user_id", GetGameByUserId)
GameRoutes.post("/createGame", CreateGame)

export default  GameRoutes;
