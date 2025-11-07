const mongoose = require("mongoose");
const Post = require("./models/post");
 main().then(()=>{
    console.log("connection is succesfull");
 }).catch(err=>console.log(err));
 async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/blog");
 }
let allPosts = [                                // all posts are saved here
    {
                           //uuidv4() will create new unique id everytime when server is refreshed
        username:"Akshay",
        image:"/uploads/botting.png",
        caption:"Teamwork on the rapids! #RiverRafting",
        count:10,
        comments:["nice bro","booting on peak"],
    },
    {
        
        username:"Shivanagouda Patil",
        image:"/uploads/dandali_bus_photo.png",
        caption:"On the way to Pinci with the gang! #RoadTripVibes",
        count:11,
        comments:["full dj","travel"]
    },
]

Post.insertMany(allPosts);
