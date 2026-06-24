import express from "express"
import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser";

import noteRoutes from "./modules/reading/reading.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"
import bookRoutes from "./modules/book/book.routes.js"


const PORT = process.env.PORT||8080

const app = express()

app.use(express.json())
app.use(cookieParser());
app.use(cors({
 
  origin: 'http://127.0.0.1:5501', 
  credentials: true
}));


app.use("/auth" , authRoutes)
app.use("/notes" , noteRoutes)
app.use("/books" , bookRoutes)

app.listen(PORT , ()=>{
    console.log("Server Started")
})