//-------------Code for connecting mongoose with Node.js--------------
const mongoose = require('mongoose');

main()
    .then(() => {
        console.log("connection successful");
    })
    . catch ((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Amazon'); //Mention the name of DB which you want to use
}
//==================================================================
//--------------Schema Validations-----------------------------
//Defining Schema -> A Proper way (We will use this always)
const bookSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
    },
    price : {
        type : Number,
        min : [0 , "Price is too low for selling on Amazon"],   //Error Handling (using built-in validators)
    },
    discount : {
        type : Number,
        default : 0,
    },
    category : {
        type : String,
        enum: ["friction" , "novel"],
    }
})

//Creating a "books" collection
const Book = mongoose.model("Book" , bookSchema);

//Checking Validation during (Create) Operation---------------------

//Adding document(i.e rows) into "books" collection
// let book1 = new Book({
//     title : "Marvel Comics",
//     price : "20",
//     category : "comics",
// })

// book1.save()
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

//Checking Validation during (Update) Operation

//Case 1 : On running the following -> NO ERROR 
//Reason : 👉 By default, Mongoose does NOT run validations on update operations
//I.E Why we use "runValidators"
// Book.findByIdAndUpdate("69da452cd765f8d53133faf3" , {price : -340})
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

//Case 2: Using runValidators()
Book.findByIdAndUpdate(
    "69da452cd765f8d53133faf3",
    {price : "-80"},
    {runValidators : true}, //To check errors before updating
    {new : true} //To return updated result
)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        //console.log(err.errors.price.properties); //Added err.errors.price.properties to give detailed description of errors
        // 🔍 Break it down step-by-step
        // 👉 err.errors
        // Contains all field errors
        // 👉 err.errors.price
        // Error related to price field
        // 👉 err.errors.price.properties

        // 👉 This is the actual metadata of the validation error

        // It tells you:

        // what rule failed
        // what value caused it
        // what was expected

        //Output received :
        //{
            // validator: [Function (anonymous)],
            // message: 'Price is too low for selling on Amazon',
            // type: 'min',
            // min: 0,
            // path: 'price',
            // fullPath: 'price',
            // value: -80
        //}
        console.log(err.errors.price.properties.message); 
        //Now Output : Price is too low for selling on Amazon
    })

