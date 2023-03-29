const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const {getPets, getPetById, updatePet, deletePet, registerPet, searchPet} = require("../controllers/petController")
const {protect} = require("../middleware/authMiddleware");
//const {registerPet} = require("../controllers/petController")


//get pet

router.route('/').get(protect, getPets); 


/*router.get('/', protect,  function (req, res)  {
    controllers.petController.getPets(req, res);
}); */

/*router.get('/',  (req, res) => {
    controllers.petController.getPets(req, res);
});


//register new pet
/*router.post('/register',  (req, res) => {
    controllers.petController.registerPet(req, res);
}); */

router.route("/register").post(protect, registerPet);

router.get("/:id", (req, res) => {
    controllers.petController.getPetById(req, res);
})

router
.route("/:id").get(getPetById).put(protect, updatePet).delete(protect, deletePet);

router.get("/search/:key", protect, function(req, res) {
    controllers.petController.searchPet(req, res);
})

/*router
.route("/search/:key").get(protect, searchPet)
*/


//get, update and detele
//router.route('/:id').get().put().delete()

module.exports = router;