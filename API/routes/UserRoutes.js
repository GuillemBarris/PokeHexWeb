import {Router} from 'express';
import {CreateUser, GetUserByEmail} from '../controllers/UserController.js';

const UserRoutes = Router();

UserRoutes.post("/createUser/", CreateUser);
UserRoutes.get("/getUserByEmail/:email/:password", GetUserByEmail);

export default UserRoutes;