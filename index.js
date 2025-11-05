/**+
REST- Representational State Transfer
REST is an architectural style that defines a set of constraints to be used for creating web services.(REST are the rules to create api)
*/

const express = require("express")
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');// required the uuid from uuid package, uuid package gives unique id
const multer =require("multer");
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,uuidv4()+path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
const methodOverride = require('method-override');  
// Require the 'method-override' package to support HTTP methods like PATCH, DELETE, etc.
// This is useful because HTML forms only support GET and POST methods.
app.use(methodOverride('_method'))          //this will override the req

app.use(express.urlencoded({extended:true}))//makes post readable for express

app.set("view engine","ejs");             // view engine is set to ejs
app.set("views", path.join(__dirname,"views"));  //default path set views even you run code outside the dir

app.use(express.static(path.join(__dirname,"public")));// path set for publc, even you run code outside the dir no error
//express.static(): Serves static files.    express.__() is object 

let posts = [                                // all posts are saved here
    {
        id:uuidv4(),                    //uuidv4() will create new unique id everytime when server is refreshed
        username:"Akshay",
        image:"/uploads/botting.png",
        caption:"Teamwork on the rapids! #RiverRafting",
        count:10,
        comments:["nice bro","booting on peak"],
    },
    {
        id:uuidv4(),
        username:"Shivanagouda Patil",
        image:"/uploads/dandali_bus_photo.png",
        caption:"On the way to Pinci with the gang! #RoadTripVibes",
        count:11,
        comments:["full dj","travel"]
    },
]


/**
 CRUD Operations
GET retrieves resources.
POST submits new data to the server
PUT updates existing data
PATCH update existing data partially
DELETE removes data

A resource = the "thing" (entity/object) on which CRUD operations are performed in this example post is the resource

CRUD
create --> post
read--> GET, POST
updaTE-->PUT,PATCH
DELTE--> DELETE
*/

app.listen(port,()=>{               //create a server
    console.log("port 8080")
})

module.exports = app;


app.get("/",(req,res)=>{     //home page api           
    res.render("getstarted.ejs")
})

//index(main)route
app.get("/posts",(req,res)=>{    //this the api which gives all data and displayed here
    res.render("index.ejs",{               //send file where all posts are seen on screen
        posts,
    });
})

//create route
app.get("/posts/new",(req,res)=>{    //  api for sending form for new post(from takes your info and create new post)
    res.render("new.ejs");           // send file were form element is there to take the info
})

//new post / Update route  --> update the array contanig data
app.post("/posts",upload.single("image"),(req,res)=>{                // api or post request to update the posts and hence also display on screen with help of above api
    let {username,caption}=req.body           // taking info from "form" recevied
    const image = req.file ? `/uploads/${req.file.filename}` : null
    let id = uuidv4();                        // gives new unique id
    posts.push({id,username,image,caption})         // update the posts array
    res.redirect("/posts")                    // redirecting to posts page,now new array(with new post is displayed), by deafualt get req is sent in redicting 
})

//view route   --> dispaly a single post in detail --> this is done by setting path in anchor tag in ejs file and there from that url you get the id
app.get("/posts/:id",(req,res)=>{   
    let {id}=req.params;          // takes id from ulr/req
    // console.log(id);            // prints in terminal not in web page
    let post = posts.find((p)=> p.id === id);  // finds the post for which given id belong to
    res.render("show.ejs",{post});            
})

//Edit Route  --> gives from to edit(callenge is that forms method is for get and post )
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;                         //these three line are just finding the post and rendering the ejs
    let post =posts.find((p)=>id===p.id);        //ejs file and above patch req ae to update the caption
    res.render("edit.ejs",{post})
})

//Patch req - Update Route (if you want you can use put req)
app.patch("/posts/:id",upload.single("image"),(req,res)=>{            // anchor tag is set in ejs file which takes to page, there in that url you will get id
    let {id}=req.params;
    // from "form" tag you will recive the info that is stored in body object
    let newcaption =  req.body.caption;       // you access to caption of post
    let post = posts.find((p)=> p.id === id); // find the post with that id
    if(req.file){
        post.image=`/uploads/${req.file.filename}`
    }
    post.caption= newcaption                  //you update the caption
    console.log(post)                         //prints in terminal
    res.redirect("/posts");                   
})

//Distroy route
app.delete("/posts/:id",(req,res)=>{           // from "form" sends the req url you get the id
    let {id}=req.params;                       // takes the id
    posts = posts.filter((p)=>id!==p.id);       //filters the post (delete the post of id got)
    // res.send("deleted")
    res.redirect("/posts");
})

//hw
app.get("/posts/:id/comments",(req,res)=>{

})