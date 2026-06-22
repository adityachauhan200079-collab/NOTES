import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { createNote , saveNote } from "./controllers.js";

const router = Router();

router.post("/createNote" , createNote)

router.put("/saveNote" , saveNote)

export default router;