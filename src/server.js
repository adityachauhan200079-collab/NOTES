import express from "express"
import "dotenv/config"
import route from "./modules/notes/routes.js"

const PORT = process.env.PORT||8080

const app = express()

app.use(express.json())

app.use(route)

app.listen(PORT , ()=>{
    console.log("Server Started")
})