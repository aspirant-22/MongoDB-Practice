const mongoose = require('mongoose');
const { type } = require("os");
const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("connection successful");
    })
    . catch ((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Creating a document in "chats" collection
let allchats = [
    {
        from: "Minal",
        to : "Anu",
        msg : "Hi !!",
        created_at : new Date(),
    },
    {
        from: "Vimal",
        to : "Mohan",
        msg : "What's up??",
        created_at : new Date(),
    },
    {
        from: "David",
        to : "Bhupesh",
        msg : "Submit your docs ASAP",
        created_at : new Date(),
    }
]

Chat.insertMany(allchats);

