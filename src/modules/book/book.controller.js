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
        return res.status(500).json({
            message:"Interna server error"
        })
    }
}

export {libraryController}