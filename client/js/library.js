const list = document.getElementById("book-list")

const bookNameInput = document.getElementById("book-name-input")
const addBookBtn = document.getElementById("book-detail-submit-btn")

async function getBooks(){

    const res = await fetch("http://localhost:8080/books/library" , {
        method:"GET",
        credentials:"include"
    })

    const data = await res.json();

    const books = data.books

    books.forEach((book)=>{
        const bookElement = document.createElement("li")
        bookElement.textContent = book.book_name
        list.appendChild(bookElement)
    })


    return data
}

window.addEventListener("DOMContentLoaded" , async()=>{
   const res = await getBooks()
})

addBookBtn.addEventListener("click" , async()=>{
    const bookDetail ={ bookName:bookNameInput.value }
    const res = await fetch("http://localhost:8080/books/addbooks" , {
        method: "POST",
        credentials:"include",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(bookDetail)
    })

    if(res.ok){
        const book = bookDetail
        const bookElement = document.createElement("li")
        bookElement.textContent = book.bookName
        list.appendChild(bookElement)

    }
    
})

