const multer = require('multer');
const{v4: uuidv4} = require('uuid');
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cd(null, "./public/uploads")
    },
    filename: function(req, file, cb){
        cd(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/pdf']
    if (allowedFileTypes.includes(file.miemtype)) {
        cb(null, true)
    }else{
        cd(null, false)
    }
}

const uploadMiddleware = multer({storage, fileFilter})

module.exports = uploadMiddleware;