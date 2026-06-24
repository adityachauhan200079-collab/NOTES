const list = document.getElementById("book-list")

async function getBooks(){

    const res = await fetch("http://localhost:8080/books/library" , {
        method:"GET",
        credentials:"include"
    })

    const data = await res.json();
    console.log(data)

}

window.addEventListener("DOMContentLoaded" , async()=>{
    await getBooks()
})