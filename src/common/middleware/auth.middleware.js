import jwt from "jsonwebtoken"


async function authMiddleware(req , res , next){
   

    const data = req.cookies.ACCESS_TOKEN;
    
    
    try{
        const decoded = jwt.verify(data , process.env.ACCESS_TOKEN_KEY)
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