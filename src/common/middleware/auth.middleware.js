import jwt from "jsonwebtoken"


async function authMiddleware(req , res , next){

    const data = req.headers.authorization

    const ACCESS_TOKEN = data.split(" ")[1]
    
    try{
        const decoded = jwt.verify(ACCESS_TOKEN , process.env.ACCESS_TOKEN_KEY)
        req.user = decoded;
        next()
    }
    catch(err){
        console.log(err)
        return res.status(403).json({
            message:"Access Token denied"
        })
    }
    
}

export {authMiddleware}