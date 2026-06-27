import apifetch from "./apifetch.js"

const nav = document.getElementsByTagName("nav")

const toggleLeft = document.getElementById("toggle-left")
const toggleRight = document.getElementById("info-btn")
const sidebar = document.getElementById("left-sidebar")
const detailsPannel = document.getElementById("right-sidebar")

const createNotebtn = document.getElementById("create-note")
const noContent = document.getElementById("no-content")
const noteForm = document.getElementById("note-form")

const notesList = document.querySelector(".notes-list")

const noteTitle = document.getElementById("note-title")
const noteContent = document.getElementById("note-content")

let timer
let currentNoteId = null


window.addEventListener("DOMContentLoaded" , ()=>{
    createNoteList()
})

toggleLeft.addEventListener("click" ,()=>{
    sidebar.classList.toggle("hide-panel")
})

toggleRight.addEventListener("click" , ()=>{
    detailsPannel.classList.toggle("hide-panel")
})

function openNoteEditor(title , content){

    noContent.classList.add("hidden");
    noteForm.classList.remove("hidden");
    

    noteTitle.value = title
    noteContent.value = content
}

createNotebtn.addEventListener("click" , ()=>{
    openNoteEditor("" , "")
    detailsPannel.classList.add("hide-panel")
    sidebar.classList.add("hide-panel")
    createNoteId()
    document.documentElement.requestFullscreen()
    createNoteList()


})


   
async function getNotes(){
    const params = new URLSearchParams(window.location.search)
    
    const bookID = params.get("bookID")

    const result = await apifetch(`http://localhost:8080/notes/getNotes/${bookID}` , {
        method:"GET",
        credentials:"include"
    })
    return result
}

async function createNoteList(){

    notesList.replaceChildren()

    const notes = await getNotes()
    console.log(notes)
    const notesArr = notes.notes

    notesArr.forEach((note)=>{
        const list = document.createElement("li")

        list.addEventListener("click" , async()=>{
            const res = await apifetch(`http://localhost:8080/notes/getNote/${note.id}` , {
                method:"GET",
                credentials:"include"
            })

            const result = await res

            const title = result.data.title
            const content = result.data.content
            openNoteEditor(title , content)
            autoSaveNote(note.id)
            
            
        })
        
        if(note.title===""){
            list.textContent = `empty note`
            list.classList.add("empty-note")
            notesList.appendChild(list)
            autoSaveNote(note.id)
        
       
        return
        }

        else{
            list.textContent = note.title
            notesList.appendChild(list)
        }
    })

 
}


const createNoteId= async()=>{

    const params = new URLSearchParams(window.location.search)
    const bookID =  params.get("bookID")

    const res = await apifetch(`http://localhost:8080/notes/createNote/${bookID}` , {
        method:"POST",
        
        credentials:"include",

    })

    const note = await res;
    console.log(note)
    currentNoteId = note.data.id;
    console.log(currentNoteId)
}
async function autoSaveNote(noteID){

noteTitle.addEventListener("input" , () =>{

    const data = {

        noteID:noteID,
        title:noteTitle.value,
        content:noteContent.value

    }
    
    autoSave(data)
    
})

noteContent.addEventListener("input" , ()=>{
    const data = {
        noteID:noteID,
        title:noteTitle.value,
        content:noteContent.value
    }

    autoSave(data)

})
}


async function autoSave(data){
    clearTimeout(timer);
    
    timer = setTimeout(async() =>{
        console.log("Title Saved!");
        const res = await apifetch("http://localhost:8080/notes/saveNote" , {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(data)
        })
        createNoteList()
    },1000);
}