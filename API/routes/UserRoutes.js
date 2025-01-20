import {Router} from 'express';
import {CreateUser} from '../controllers/UserController.js';

const UserRoutes = Router();

UserRoutes.post("/createUser/", CreateUser);

export default UserRoutes;