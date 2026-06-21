import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pool } from "../../common/config/db"

const saltRounds = 10

async function hashPassword(data){
    hashedData = await bcrypt.hash(data , saltRounds)

    return hashedData

}

async function registerService(data){
    
    const {userName , pass} = data
    
    const hashedPass = await hashedPassword(pass);

    const user = await pool.query("INSERT INTO users(username , hashed_password) VALUES ($1 , $2) RETURNING *", [userName , hashedPass])

    const userID = user.rows[0].id
     
    return userID 
}

async function loginService(data){

const {userName , pass} = data

const hashedPass = await pool.query("SELECT hashed_password FROM users WHERE username = $1" , [userName])

const passCheack = await bcrypt.compare(pass , hashedPass.rows[0].hashed_password)

if(!passCheack){
    return {
        ACCESS_TOKEN: null , 
        REFRESH_TOKEN:null
    }
}

const ACCESS_TOKEN = jwt.sign({userName} , process.env.ACCESS_TOKEN_KEY , {expiresIn:'1h'})
const REFRESH_TOKEN = jwt.sign({userName} , process.env.ACCESS_TOKEN_KEY , {expiresIn:'7d'})

return {ACCESS_TOKEN:ACCESS_TOKEN , REFRESH_TOKEN:REFRESH_TOKEN}

}

export {registerService , loginService}