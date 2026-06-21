import {createNoteService , saveNoteService}from "./service.js"

const createNote = async (req ,res)=>{
    
    const data = req.body;

    const result = await createNoteService(data)

    console.log(result)


    res.status(201).json(
        {
            message:"Notes Created",
            data:result
        }
    )

}

const saveNote = async(req , res)=>{
    const data = req.body

    const result = saveNoteService(data)

    res.json({
        message:"Successfully saved"
    })
}


export {createNote , saveNote}