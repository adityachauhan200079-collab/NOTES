const toggleLeft = document.getElementById("toggle-left")
const toggleRight = document.getElementById("info-btn")
const sidebar = document.getElementById("left-sidebar")
const detailsPannel = document.getElementById("right-sidebar")

const createNotebtn = document.getElementById("create-note")
const noContent = document.getElementById("no-content")
const noteForm = document.getElementById("note-form")

const noteTitle = document.getElementById("note-title")
const noteContent = document.getElementById("note-content")

toggleLeft.addEventListener("click" ,()=>{
    sidebar.classList.toggle("hide-panel")
})

toggleRight.addEventListener("click" , ()=>{
    detailsPannel.classList.toggle("hide-panel")
})

createNotebtn.addEventListener("click" , ()=>{
    noContent.classList.add("hidden");
    noteForm.classList.remove("hidden");
    createNoteId()
})

const newNote = {
    title:"",
    content:""
}

let timer

let currentNoteId = null;

const createNoteId= async()=>{
    const res = await fetch("http://localhost:8080/notes/createNote" , {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(newNote)

    })

    const note = await res.json();
    console.log(note)
    currentNoteId = note.data.id;
    console.log(currentNoteId)
}

noteTitle.addEventListener("input" , () =>{
    autoSave(noteTitle.value)
})


async function autoSave(data){
    clearTimeout(timer);
    
    timer = setTimeout(async() =>{
        console.log("Title Saved!");
        const res = await fetch("localhost:8080/notes/saveNote" , {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })

    },1000);
}











