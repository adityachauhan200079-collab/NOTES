import express from "express"
import "dotenv/config"
import cors from "cors"

import noteRoutes from "./modules/notes_module/routes.js"
import authRoutes from "./modules/auth_module/auth.routes.js"


const PORT = process.env.PORT||8080

const app = express()

app.use(express.json())
app.use(cors())

app.use("/auth" , authRoutes)
app.use("/notes" , noteRoutes)

app.listen(PORT , ()=>{
    console.log("Server Started")
})
