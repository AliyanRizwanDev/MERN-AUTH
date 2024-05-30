import express from 'express'
import { login, signup } from '../Controllers/User.js';
const routes = express.Router();

routes.post("/login", login )
routes.post("/signup", signup )

export default routes;