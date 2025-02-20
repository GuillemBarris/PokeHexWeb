import { Router } from "express";
import { GetAllMoves } from "../controllers/MoveController.js";

const MoveRoutes = Router();

MoveRoutes.get("/getAllMoves", GetAllMoves);

export default MoveRoutes;