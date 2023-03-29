const express = require('express');

const router = express.Router();
const controllers = require("../controllers");
const {protect} = require("../middleware/authMiddleware");
const {getRecord} = require("../controllers/recordController")
const multer = require("multer")
const uploadMiddleware = require("../middleware/multerMiddleware")



router.route("/").get(protect, getRecord);

/*router.get('/',   protect, function (req, res) {
    controllers.recordController.getRecord(req, res);
}); */

router.post('/add/:petid', protect, function (req, res) {
    controllers.recordController.addRecord(req, res);
});

router.get('/:id', (req, res) => {
    controllers.recordController.getRecordById(req, res)
})


router.put('/:id', (req, res) => {
    controllers.recordController.updateRecord(req, res)
})

router.delete('/:id', (req, res) => {
    controllers.recordController.deleteRecord(req, res)
})


router.get("/search/:key",  protect, function (req, res) {
    controllers.recordController.searchRecord(req, res)
})

router.post('/', (req, res) => {
    const fileName= Date.now() + " " + req.files.upload.name;
    const file = req.files.upload;
    let uploadPath =  "./uploads/" + fileName;
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.send(err);
        }
    });
    res.status(200)
}); 

module.exports = router