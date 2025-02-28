import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/user";
import ContentRouter from "./routes/content";
import ShareRouter from "./routes/share";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();


const DB_URL = process.env.DB_URL as string;
const startDB = async()=> {
    try {
        await mongoose.connect(DB_URL);   
        console.log('Connected to the DB.');        
    } catch (error) {
        console.error('Error connecting to the DB.');
        process.exit(1);        
    }
}


startDB();

const app = express();
app.use(express.urlencoded({ extended: true }));  
app.use(cors());

app.use(express.json());


app.listen(process.env.PORT, ()=> {
    try {
        console.log("Sever connected on port: "+process.env.PORT)
    } catch (error) {
        console.log("Error connecting to port.")        
    }
})

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/content', ContentRouter);
app.use('/api/v1/brain', ShareRouter);

