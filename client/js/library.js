import apifetch from "./apifetch.js"

const list = document.getElementById("book-list")

const bookNameInput = document.getElementById("book-name-input")
const addBookBtn = document.getElementById("book-detail-submit-btn")

async function createBookList(books){
    books.forEach((book)=>{
        const bookElement = document.createElement("li")
        const bookLink = document.createElement("a")
        const bookDelete = document.createElement("button")

        const bookID = book.id

        

        bookDelete.textContent = "Remove"
        bookLink.textContent = book.book_name
        bookLink.href = `http://127.0.0.1:5500/client/notes.html?bookID=${bookID}`


        bookDelete.addEventListener("click" , async()=>{
           
            const res = await apifetch(`http://localhost:8080/books/deleteBook/${bookID}` , {
            method:"DELETE",
            credentials:"include"
            })

            list.removeChild(bookElement)
        })
    

        list.appendChild(bookElement)
        bookElement.appendChild(bookLink)
        bookElement.appendChild(bookDelete)
        

    })
}



async function getBooks(){

    const options = {
        method:"GET",
        credentials:"include"
    }

    const res = await apifetch("http://localhost:8080/books/library" , options);

    const data = res

    const books = data.books

    createBookList(books)



    return data
}

window.addEventListener("DOMContentLoaded" , async()=>{
   const res = await getBooks()

   
})

addBookBtn.addEventListener("click" , async()=>{
    const bookDetail ={ bookName:bookNameInput.value }
    const res = await apifetch("http://localhost:8080/books/addbooks" , {
        method: "POST",
        credentials:"include",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(bookDetail)
    })

    const data = await res.json()

    const book = [data.book]
    console.log(book)
    if(res.ok){
      createBookList(book)
    }
    
})

