import apifetch from "./apifetch.js"

const usernameInput = document.querySelector(".username")
const passwordInput = document.querySelector(".password")

const registerBtn = document.querySelector(".register-btn")


registerBtn.addEventListener("click" , async ()=>{
    const username = usernameInput.value
    const password = passwordInput.value

    const data = {
        userName:username,
        pass:password
    }

    
    const options = {
        method:'POST',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    }
    
    const res = await apifetch("http://localhost:8080/auth/register" , options)

    console.log(res)

})

