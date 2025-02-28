import mongoose from "mongoose";
import { Schema } from "mongoose";
export const contentTypes = ['image', 'Video', 'Document', 'Link', 'youtube', 'Tweet'];


const User = new Schema({
    username : {type : String, unique : true, required : true},
    firstName : String,
    lastName : String,
    password : {type : String , required : true}
});



const Content = new Schema({
    link : {type : String , required : true},
    type : {type : String , enum : contentTypes, required : true},
    title : {type : String, required : true},
    tags : [{type : Schema.Types.ObjectId, ref : 'Tags'}],
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }

})


const Tags = new Schema({
    title : {type : String , required : true,  unique : true}
})

const Link = new Schema({
    hash : {type : String, required : true},
    userId : {type : Schema.Types.ObjectId, ref : 'User', required : true}
})

export const UserModel = mongoose.model("User", User);
export const ContentModel = mongoose.model("Content", Content);
export const TagsModel = mongoose.model("Tags", Tags);
export const LinkModel = mongoose.model("Link", Link);
