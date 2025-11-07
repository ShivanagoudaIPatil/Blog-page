const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    image:{
        type: String,
    },
    caption:{
        type: String,
        required: true,
    },
    count:{
        type:Number,
        default:0,
    },
    comments:{
        type:[String],
    }
});

const Post = mongoose.model("Post",postSchema);
module.exports = Post;