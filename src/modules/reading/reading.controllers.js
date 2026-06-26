import {createNoteService , saveNoteService , getNotesService , getNoteService}from "./reading.service.js"

async function getNotesController(req , res){

    const userID = req.user.userID
    const bookID = req.params.bookID

    const data = {
        userID:userID,
        bookID:bookID
    }
    try{
        const result = await getNotesService(data)
        
        return res.status(200).json({
            notes: result
            
        })

    }
    catch(err){
        console.log(err)
        res.status(400).json({
            message:"Internal Server error"
        })
    }

}

async function getNoteController(req , res){

    const userID = req.user.userID
    const noteID = req.params.noteID

    const data = {
        userID:userID,
        noteID:noteID
    }

    try{
        const result = await getNoteService(data)
        return res.status(200).json({
            message:"Note Found",
            data: result
        })
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            message:"Note not found"
        })
    }

}
const createNote = async (req ,res)=>{
    
    const userID = req.user.userID
    const bookID = req.params.bookID

    const data = {
        userID:userID,
        bookID:bookID
    }

    const result = await createNoteService(data)

    console.log("This is the first row of the returning value : " , result)
    
    res.status(201).json(
        {
            message:"Notes Created",
            data:result
        }
    )
}

const saveNoteControllers = async(req , res)=>{
    const data = req.body

    const result = saveNoteService(data)
    try{
    res.status(200).json({
        message:"Successfully saved"
    })
    }
    catch(err){
        res.status(400).json({
            message:"Autosave unsuccessfull"
        })
    }
}




export {createNote , saveNoteControllers , getNotesController , getNoteController}