import {Router} from "express"

import { libraryController , addBooksController } from "./book.controller.js"
import {authMiddleware} from "../../common/middleware/auth.middleware.js"

const router = Router()

router.get("/library" ,authMiddleware, libraryController)
router.post("/addbooks" , authMiddleware , addBooksController)

export default router