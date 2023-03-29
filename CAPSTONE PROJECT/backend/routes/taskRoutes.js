const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const {protect} = require("../middleware/authMiddleware");
const models = require("../models");



router.get("/", (req, res) => {
    controllers.taskController.getTask(req, res)
})

router.post("/", (req, res) => {
    controllers.taskController.addTask(req, res)
})

router.delete("/:id", (req, res) => {
    controllers.taskController.deleteTask(req, res)
})

router.put("/:id", (req, res) => {
    controllers.taskController.updateTask(req, res)
})


module.exports = router 


/*
router.put("/:id", async (req, res) => {
    try {
        const task = await models.Tasks.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const task = await new models.Tasks(req.body).save();
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.get("/", async (req, res) => {
    try {
        const tasks = await models.Tasks.find();
        res.send(tasks);
    } catch (error) {
        res.send(error);
    }
});



router.delete("/:id", async (req, res) => {
    try {
        const task = await models.Tasks.findByIdAndDelete(req.params.id);
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router; */