//-------------Code for connecting mongoose with Node.js--------------
const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("connection successful");
    })
    . catch ((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
//==================================================================
//--------------C (Create) Operation -> Adding documents(i.e rows) to collections(i.e table)
//Step 1 : Defining Schema for the collection "users"-----------------------------
const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    age : Number,
})

//Step 2: Creating a collection k/a "users"
const User = mongoose.model("User" , userSchema); //Creates a collection named as "users" in "test" DB

//Step 3: Creating a new document (i.e a row) + Saving/Adding it  to "users" collection

//Way 1 : Using then-catch--------------------------------
// const user1 = new User({ //Creating a document
//     name : "Aman",
//     email : "aman@gmail.com",
//     age : 48,
// });

// user1.save(); //Saving "user1" document to "user" collection

// const user2 = new User({
//     name : "Eve",
//     email : "eve@gmail.com",
//     age : 48,
// });

// user2.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     })

//Way 2: Using "insertMany()"-----------------------------

// User.insertMany([
//     {name : "Tony" , email : "tony@gmail.com" , age : 41},
//     {name : "Bruce" , email : "bruce@gmail.com" , age : 46},
//     {name : "Peter" , email : "peter@gmail.com" , age : 50},
// ]).then ((res) => {
//     console.log(res);
// })
//=======================================================================
//-------------R (Read Operation) -> Finding specific or all users---------

//--------------------find() Operation------------------
// User.find({}).then((res) => {
//     console.log(res);
// })

// User.find({}) //using then-catch
//     .then((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     })

// User.find({ age : {$gt : 47}}) //With condition
//     .then((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     })

// User.find({ age : {$gt : 47}}) //With condition + Extracting only specific details
//     .then((res) => {
//         let arr = res;
//         for (let i = 0 ; i < arr.length ; i++){
//             console.log(arr[i].name);
//         }
//     })
//     .catch ((err) => {
//         console.log(err);
//     })

//---------------findOne() operation------------------------
// User.findOne({ age : {$gt : 47}})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     })

//---------------findById() operation----------------------
// User.findById("69da2839513129680c01144c")
//     .then((res) => {
//         console.log(res);
//     })
//     .catch ((err) => {
//         console.log(err);
//     })

//===============================================================
//-------------U (Update Operation) -> Change/modify user data
// User.updateOne({name : "Peter"} , {age : 52})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// User.updateMany({age : {$eq : 48}} , {age : 53})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// User.findOneAndUpdate({name : "Eve"} , {age : 40} , {new : true})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// User.findByIdAndUpdate("69da2839513129680c01144b" , {age : 40} ,{new : true})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

//================================================================
//-----------------(D) -> Delete Operation (Delete one or multiple users)
// User.deleteOne({age : 40})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// User.deleteMany({age : {$lt : 50}})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// User.findOneAndDelete({age : 56})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// User.findByIdAndDelete('69da2475ca0a4fa58fe9863d')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

//==============================================================







