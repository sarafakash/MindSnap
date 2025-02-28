import express from "express";
import { UserModel } from "../db/db";
const UserRouter = express.Router();
import {z} from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const signUpZodSchema = z.object({
    username : z.string().min(3).max(20),
    firstName : z.string().min(2).max(20), 
    lastName : z.string().min(2).max(20), 
    password : z.string().min(2).max(20)
});

const signInZodSchema = z.object({
    username : z.string(),
    password : z.string()
})

UserRouter.post("/signup", async(req: any ,res: any) => {


    const {success} = signUpZodSchema.safeParse(req.body);
    if(!success) {
        return res.status(411).json({
            message : "Invalid inputs for signing up."
        })
    }

    const {username, firstName, lastName, password} = req.body;

    try {
        const duplicateUsername = await UserModel.findOne({username});

        if(duplicateUsername)
                return res.status(403).json({message : "User already exists with this username"});

        const hashedPassword = await bcrypt.hash(password,5);
        await UserModel.create({
          username, firstName, lastName, password : hashedPassword
        });
        return res.status(200).json({
          message: "Signup successful."
        });
      } catch (error) {
        return res.status(500).json({
          message: "Server error"
        });
      }
})


UserRouter.post("/signin", async (req: any,res: any)=> {
    const parsedZodInput = signInZodSchema.safeParse(req.body);
    if(!parsedZodInput.success) {
        return res.status(411).json({
            message : "Invalid inputs."
        })
    }
    const {username, password} = parsedZodInput.data;

    try {

        const userFind = await UserModel.findOne({username});

        if(!userFind || !userFind.password) {
            return res.status(403).json({ message: "Invalid username or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, userFind.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid username or password." });
        }


        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined.");
            return res.status(500).json({ message: "Internal server error." });
        }

        const token = jwt.sign({ id: userFind._id }, process.env.JWT_SECRET);


        return res.status(200).json({
            message: "Signin successful.",
            token
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });        
    }

})



export default UserRouter;
