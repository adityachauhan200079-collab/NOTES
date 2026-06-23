import { pool } from "../../common/config/db"

async function libraryService(userID){

    const books = await pool.query("SELECT * FROM books WHERE userID = ($1) " , [userID])
    
    return books.rows
 
}

export {libraryService}