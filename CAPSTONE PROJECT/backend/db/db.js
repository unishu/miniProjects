const mongoose = require("mongoose");

//mongoose.connect("mongodb://127.0.0.1:27017/PETAPP")


const uri = process.env.MONGO_URI || "mongodb+srv://mmar:petbook123@cluster0.1tqfanm.mongodb.net/PetBook?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log(`You have successfully connected to database: ${conn.connection.host}`)
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB


/*'use strict'

var mongoose = require('mongoose');
const uri = process.env.DB_URI || "mongodb://127.0.0.1/test";

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(uri, mongooseOptions, function(err){

    if (err){
        console.log('error in db connection');
        process.exit(1);
    }else{
        console.log("Successfully connected to database");
    }
})

//exports.mongoose = mongoose;
module.exports = mongoose; */