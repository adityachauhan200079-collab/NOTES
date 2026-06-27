async function apifetch(url , options){
    const result = await fetch(url ,{ 
        credentials:"include",
        ...options
    })

    if(result.ok){
        return result.json()
    }

    else if(result.status===403){
        const result = await fetch("http://localhost:8080/auth/refreshToken" , 
            {
                method:"GET", 
                credentials:"include"
        }
    )

        if(result.ok){
            const result = await fetch(url ,{ 
            credentials:"include",
            ...options
            })
        }
        else{
            window.location.href = "./login.html"; 
        }
    }
}

export default apifetch