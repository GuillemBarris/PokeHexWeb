import { Router } from "express";
import { CreateMove, GetAllMoves } from "../controllers/MoveController.js";

const MoveRoutes = Router();

MoveRoutes.get("/getAllMoves", GetAllMoves);
MoveRoutes.post("/createMove", CreateMove);

export default MoveRoutes;