'use strict';

const mongoose = require("mongoose");

//mongoose.connect("mongodb://127.0.0.1:27017/test")

const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/test"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log(`Successfully connected to database: ${conn.connection.host}`)
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB


/*
const { default: mongoose } = require('mongoose');
const Mongoose = require('mongoose');

const uri = process.env.DB_URI || "mongodb://127.0.0.1:27017/"

exports.connect =() => {
    //CONNECTING TO THE DATABASE
    mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useFindAndModify: false,
    })
    .then (() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("Database connection failed. Exiting now...");
        console.log(error);
        process.exit(1);
    });
}



const db = Mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected successfully");
});

exports.Mongoose = Mongoose; */