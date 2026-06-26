    import { pool } from "../../common/config/db.js"

    async function getNotesService(data){

        const {userID , bookID} = data
        
        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND book_id = $2" , [userID , bookID])
      
        const notes = result.rows
        return notes
    }
    
    async function getNoteService(data){
        const {userID , noteID} = data

        const result = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND id = $2" , [userID , noteID])
       console.log("service")
        return result.rows[0]

    }

    const createNoteService = async (data)=>{

        const {userID , bookID} = data

       const emptyCheck = await pool.query("SELECT * FROM notes WHERE user_id = $1 AND book_id = $2 AND title = $3 AND content = $4" , [userID , bookID , "" , ""])

       if(emptyCheck.rowCount!==0){
        return emptyCheck.rows[0]
       }

        const result = await pool.query("INSERT INTO notes (user_id , book_id , title , content) VALUES ($1,$2,$3,$4) RETURNING *" , [userID , bookID,"" , ""])
      
        return result.rows[0]
        
        

    }

    const saveNoteService = async(data)=>{
        const {noteID , title , content} = data

        const result = await pool.query("UPDATE notes SET title = $1 ,content =$2 WHERE id = $3" , [title , content , noteID])
    }



    export {createNoteService , saveNoteService , getNotesService , getNoteService}