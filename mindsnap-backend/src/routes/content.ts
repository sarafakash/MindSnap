import express from "express";
import auth from "../auth/auth";
import { ContentModel, TagsModel } from "../db/db";
import mongoose from "mongoose";
const ContentRouter = express.Router();

ContentRouter.post("/", auth, async (req: any,res: any) => {                // add content
    const userPersonId = req.userId;
    const {link, type, title, tags} = req.body;
    console.log(req.body);

    let tagIds = [];

    try {
        for(let tag of tags) {
            if(mongoose.Types.ObjectId.isValid(tag))
                tagIds.push(tag);
            else if(typeof tag === "string") {
                let existingTag = await TagsModel.findOne({title : tag});
                if(!existingTag)
                    existingTag = await TagsModel.create({title : tag})
                tagIds.push(existingTag!._id);
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message : "error while adding content."
        })
    }

    try {
        await ContentModel.create({
            link, type, title, tags : tagIds, userId : userPersonId 
        })
        return res.status(200).json({
            message : "db updated."
        })    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "error while updating db."
        })            
    }

})

ContentRouter.get("/", auth, async (req: any,res: any) => {                 // get content
    const userPersonId = req.userId;
    try {
        const dataUser = await ContentModel.find({userId : userPersonId}).populate('userId', 'username firstName lastName').populate('tags', 'title');
        res.status(200).json({
            message : dataUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "error in getting content"
        })
    }
    
})

ContentRouter.delete("/", auth, async(req: any,res: any) => {               // delete content
    
    const userPersonId = req.userId;
    const {contentId} = req.query;
    if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return res.status(400).json({ message: "Invalid content ID" });
    }
    try {
        await ContentModel.deleteOne({_id : contentId, userId : userPersonId});
        return res.status(200).json({message : "content deleted"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "error in content deletion"});
    }
})


export default ContentRouter;