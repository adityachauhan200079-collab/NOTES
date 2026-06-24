import { registerService , loginService } from "./auth.services.js";


async function registerController(req , res){
    const data = req.body;

    const id = await registerService(data)

   return res.json({
        message:"User created",
        id: id
    })
}

async function loginController(req , res){
    const data = req.body

   
    const {ACCESS_TOKEN , REFRESH_TOKEN} = await loginService(data)
       if(ACCESS_TOKEN!=null&&REFRESH_TOKEN!=null){
    res.cookie("ACCESS_TOKEN", ACCESS_TOKEN, {
        httpOnly: true,
        maxAge:60*60*1000
    });

    console.log(ACCESS_TOKEN)
    res.cookie("REFRESH_TOKEN" , REFRESH_TOKEN, {
        httpOnly: true,
        maxAge:7*24*60*60*1000
    });

    return res.json({
        message:"You are logged in"
    })
       }
    else{
        console.log("Wrong password")
        return res.status(403).json({
        message:"Login failed!"
    })
    }


    }
    


export {registerController , loginController}