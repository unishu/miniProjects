const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require('cors')
const http = require("http");
const fileUpload = require("express-fileupload");
const connectDB = require("./db/db")
const server = http.createServer(app);
const path = require('path')
//let io = require('socket.io')(http);
require("dotenv").config();


//handle uncaught exceptions
process.on('uncaughtException', function (err) {
    console.log(err);
  });



//require("./db/dbConnect").connect();

//app.use(express.json());

app.use(cors());
app.use(fileUpload());
connectDB()

// use bodyparser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser) 


const { notFound, errorHandler } = require("./middleware/errorMiddleware");



//BodyParsing
//app.use(express.urlencoded({extended: false}));

//let dbConnect= require("./db/dbConnect")



app.use('/api/users', require("./routes/userRoutes"));

app.use("/api/pets", require("./routes/petRoutes"));

app.use("/api/petrecords", require("./routes/recordRoutes"));

app.use('/api/tasks', require("./routes/taskRoutes"));

app.use('/api/calendar', require("./routes/calendarRoutes"));

app.get("/mongo", (req, res) => {
    res.json({ message: "Welcome to my MongoDB application." });
}); 

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/*app.get("/", (req, res) => {
    res.send(path.join(__dirname, "../frontend/public/index.html"))
}); 


//const path = require("path");
app.use(express.static(path.join(__dirname, "frontened/build"))) */



/*app.post("/pic", (req, res) => {
    const fileName= Date.now() + req.files.upload.name;
    const file = req.files.upload;
    let uploadPath = __dirname + "/uploads/" + fileName;
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.send(err);
        }
    });
    res.status(200)
}); */


app.get("/api/pets/:id", (req, res) => {
    const pet = pets.find((n) => n._id === req.params.id)
    res.send(pet)
});

app.use(notFound);
app.use(errorHandler);

const { API_PORT } = process.env;
const port = process.env.PORT || 5000 //API_PORT;

// server listening    
server.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});

console.log('DB_URL :', process.env.DB_URL);
console.log('DB_Name :', process.env.DB_Name);




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