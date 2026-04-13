//------------Basic Setup for all MERN Projects---------
//--------Setting up Server + Express + EJS
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const Chat = require("./models/chat.js"); //Add this line whenever you create a separate file for schema
const methodOverride = require('method-override');

app.set("views" , path.join(__dirname , "views"));
app.set("view engine" , "ejs");
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true})); //V Imp for post route otherwise it won't work

app.listen(port , (req , res) => {
    console.log(`Server is listening at port ${port}`);
})

app.get("/" , (req , res) => {
    res.send("Server working well");
})

//-------------Code for connecting mongoose with Node.js--------------
const mongoose = require('mongoose');
const { type } = require("os");

main()
    .then(() => {
        console.log("connection successful");
    })
    . catch ((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//----------------End of Basic Setup -------------------------------------------------
//====================================================================
//Index Route - Show all chats
app.get("/chats" , async (req , res) => {
    let chats = await Chat.find();//here Chat.find() -> MongoDB Query
    res.render("index.ejs" , { chats });
})
//Create Route - Add a chat
app.get("/chats/new" , (req , res) => {
    res.render("new.ejs");
})
app.post("/chats" , (req , res) => {
    let {from , to , msg} = req.body;
    let chat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    })
    chat.save()
        .then((res) => {
            console.log("Chat was saved");
        })
        .catch((err) => {
            console.log(err);
        })
    res.redirect("/chats");
})
//Edit Route 
app.get("/chats/:id/edit" , async (req , res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs" , { chat });
})
app.patch("/chats/:id" , async (req , res) => {
    let { id } = req.params; //Always use this method for extracting "id"
    let {msg : newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate( id , {msg : newMsg} , {runValidators : true , new : true});
    console.log(updatedChat);
    res.redirect("/chats");
})
//Delete Route
app.delete("/chats/:id" , async (req , res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

