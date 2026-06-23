import { pool } from "../../common/config/db.js"

async function libraryService(userID){

    const books = await pool.query("SELECT * FROM books WHERE userID = ($1) " , [userID])
    
    return books.rows
 
}

async function addBookService(data){

    const {userID , bookName} = data

    const book = await pool.query("INSERT INTO books(user_id , book_name) VALUES($1 ,$2) RETURNING id ,book_name" , [userID , bookName])

    const bookname = book.rows[0]

}

export {libraryService , addBookService}