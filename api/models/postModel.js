import mongoose from "mongoose";
const postSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type:String,
        required:true
    },
    content: {
        type: String,
        required: true
    },
   image:{
    type: String,
    default:'https://images.pexels.com/photos/733856/pexels-photo-733856.jpeg?auto=compress&cs=tinysrgb&w=600',

   },
   category:{
    type: String,
    default:'UnCategorized'
   },
   slug:{
    type: String,
    required: true,
    unique: true
   },

  
},{timestamps:true})

const Post = mongoose.model('Post', postSchema)
export default Post