const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();

let dbConnect = require("./dbConnect");
dbConnect.connectMysql()


app.use(express.json());
//BodyParsing
app.use(express.urlencoded({extended: false}));

//let dbConnect= require("./db/dbConnect")



// server listening 


//app.use('/', require("./routes/userRoutes"))

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my mySQL application." });
});

app.get("/test", (req, res) => {
    res.json({ message: "This db is working" });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
/*
const express = require('express')
const app = express("./app")
require("dotenv").config();

var port = 3000

app.use(express.json())

//app.use('/', express.static('public'))
//app.use(express.static(path.join(__dirname, "public")))


app.get('/test', (req, res) => {
    res.send('Hello World!')
})

app.get("/animal/:name", (req, res) => {
    console.log(req.params.name)
    res.send("You've got me")
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my MongoDB application." });
});
   */