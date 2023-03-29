const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const models = require('../models');

router.post("/create-event", (req, res) => {
    controllers.calendarController.newEvent(req, res)
});

router.get("/get-events", (req, res) => {
    controllers.calendarController.getEvent(req, res)
});

router.get("/", (req, res) => {
    controllers.calendarController.deleteEvent(req, res)

})

module.exports = router