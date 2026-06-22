    import { pool } from "../../common/config/db.js"
    
    const createNoteService = async (data)=>{

        const {title , content} = data

        try{
        const result = await pool.query("INSERT INTO notes (title , content) VALUES ($1,$2) RETURNING *" , ["" , ""])
        console.log("This is the raw returning value :  " , result)
        return result.rows[0]
        }
        catch(err){
            console.log(err)
        }
        

    }

    const saveNoteService = ()=>{
        
    }



    export {createNoteService , saveNoteService}