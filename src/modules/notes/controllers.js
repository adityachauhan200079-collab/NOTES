import {createNoteService , saveNoteService}from "./service.js"

const createNote = async (req ,res)=>{
    console.log(req.body)
    const data = req.body;
    console.log(data)
    const result = await createNoteService(data)

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