    import { pool } from "../../common/db.js"
    
    const createNoteService = async (data)=>{

        const {title , content} = data

        try{
        const result = await pool.query("INSERT INTO notes (title , content) VALUES ($1,$2) RETURNING *" , ["" , ""])
        
        return result.rows[0]
        }
        catch(err){
            console.log(err)
        }
        

    }

    const saveNoteService = ()=>{
        
    }



    export {createNoteService , saveNoteService}