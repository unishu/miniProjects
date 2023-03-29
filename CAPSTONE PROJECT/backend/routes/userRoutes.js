var express = require("express");
const controllers = require("../controllers");
var router = express.Router();
//const db = require("./db/dbConnect");
const {protect} = require("../middleware/authMiddleware")

const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./frontend/public/uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})

const upload = multer({storage: storage})

//Register
/*router.post("/register", (req, res) => {
    try {
        //get user input
        const {firstName, lastName, email, password} = req.body;

        //validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input is required");
        }
    }

}) */

//homepage
router.get ('/', (req, res) => {
    controllers.userController.getUsers(req, res);
   
});


//register new user
router.post('/register', (req, res) => {
    //res.send('<h1> user Data is posted </h1>');
    controllers.userController.createUser(req, res)
})

//login
router.post('/login', (req, res) => {
    controllers.userController.getUser(req, res)
})


//get user by Id
router.get('/:id', (req, res) => {
    controllers.userController.getUserById(req, res)
})

//delete user by Id
router.delete('/:id', (req, res) => {
    controllers.userController.deleteUser(req, res)
})

//update user via Id
router.put('/update/:id',  upload.single("userImage"),protect, function (req, res) {
    controllers.userController.updateUser(req, res)
})



/*
//Login
router.post("/account/login", (req, res) => {

})

//register pet
router.post('/', controllers.userController.addUser);

//delete pet
router.delete('/:id', controllers.userController.deleteUser);

//update pet data
router.put('/update', controllers.userController.updateUser);

//get pet by id or other params
router.get('/update/:id', controllers.userController.getUserById);

//get list of pets
router.get('/yourpets', controllers.userController.getUsers);

*/


module.exports = router;