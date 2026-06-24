import jwt from "jsonwebtoken"


async function authMiddleware(req , res , next){
    console.log(req.cookies)

    const data = req.cookies.ACCESS_TOKEN;
    console.log(data)
    
    try{
        const decoded = jwt.verify(data , process.env.ACCESS_TOKEN_KEY)
        req.user = decoded;
        console.log(decoded)
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