import { libraryService,addBookService } from "./book.services.js"

async function libraryController(req , res){
   
    const userID = req.user.userID
    try{
    const books = await libraryService(userID)

    return res.status(200).json({
        message:"Your books found!",
        books:books
    })
    }
    catch(err){
        return res.status(404).json({
            message:"Internal server error"
        })
    }
}

async function addBooksController(req , res){

    const userID = req.user.userID
    const bookName = req.body.bookName

    const data = {
        userID:userID,
        bookName:bookName
    }

    try{
        const book = addBooksService(data)

        res.status(201).json({
            message:"Book added!",
            book: book
        })
    }
    catch(err){
        res.status(400).json({
            message:"Book not added"
        })
    }
}

export {libraryController , addBooksController}