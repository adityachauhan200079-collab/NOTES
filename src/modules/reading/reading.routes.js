import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import {authMiddleware} from "../../common/middleware/auth.middleware.js"

import { createNote , getNoteController, getNotesController, saveNoteControllers } from "./reading.controllers.js";


const router = Router();


router.get("/getNotes/:bookID" , authMiddleware , getNotesController)
router.get("/getNote/:noteID", authMiddleware , getNoteController) 
router.post("/createNote/:bookID" ,authMiddleware, createNote)
router.put("/saveNote" ,authMiddleware, saveNoteControllers)

export default router;