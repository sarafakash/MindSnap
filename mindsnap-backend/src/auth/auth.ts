import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth = async(req: any, res: any, next: any) => {
    try {
        const token = req.headers.token;
        if(!token)
            return res.status(401).json({message : "Token invalid"});

        if(!process.env.JWT_SECRET)
            return res.status(501).json({message : "Internal Server Error"});               

        const validUser = jwt.verify(token, process.env.JWT_SECRET) as {id : string};

        if(!validUser)
            return res.status(401).json({message : "Invalid credentials"});             

        req.userId = validUser?.id ;
        next();

    } catch (error) {
        return res.status(401).json({
            message : "Restricted Access"        
    })
}
}   


export default auth;