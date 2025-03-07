import { Router } from "express";
import { CreateMove, GetAllMoves } from "../controllers/MoveController.js";
import { authenticateToken } from "../middleware/middleware.js";

const MoveRoutes = Router();

MoveRoutes.get("/getAllMoves", authenticateToken, GetAllMoves);
MoveRoutes.post("/createMove", authenticateToken, CreateMove);

export default MoveRoutes;