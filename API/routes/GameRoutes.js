import { Router } from "express";
import { UpdateGame, DeleteGame, CreateGame, GetGameByUserId } from "../controllers/GameController.js";
import { authenticateToken } from "../middleware/middleware.js";

const GameRoutes = Router();

GameRoutes.get("/getGameByUserId/:user_id", authenticateToken, GetGameByUserId)
GameRoutes.post("/createGame", authenticateToken, CreateGame)
GameRoutes.put("/updateGame/:id", authenticateToken, UpdateGame)
GameRoutes.delete("/deleteGame/:id", authenticateToken, DeleteGame)



export default  GameRoutes;
