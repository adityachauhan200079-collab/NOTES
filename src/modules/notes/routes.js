import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

import { createNote , saveNote } from "./controllers.js";

const route = Router();

route.get("/",(req , res)=>{
    res.send("Hello World!")
})

route.post("/createNote" , createNote)

route.put("/saveNote" , saveNote)

export default route;