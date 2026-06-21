import { Router} from "express";

import { registerController } from "./auth.controller";

const route = Router()

route.post("/register" , registerController)