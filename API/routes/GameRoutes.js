import { Router } from "express";
import { GetGameByUserId } from "../controllers/GameController.js";

const GameRoutes = Router();

GameRoutes.get("/getGameByUserId/:user_id", GetGameByUserId)

export default  GameRoutes;
