'use strict'

const models = require("../models");
const asyncHandler = require("express-async-handler");
const moment = require("moment")


const newEvent = async(req, res) => {
    try {
    const event = await new models.Events(req.body).save();
    res.send(event);
    } catch (error) {
    res.send(error)
}}

const getEvent = async (req, res) => {
    const events = await models.Events.find({start: {$gte: moment(req.query.start).toDate()}, 
    end:{$lte: moment(req.query.end).toDate()}
});
res.send(events)
}

const deleteEvent = async (req, res) => {
    try {
        const task = await models.Events.findByIdAndDelete(req.params.id);
        //res.send(task);
        res.status(200).json({message: "Record deleted"})
    } catch (error) {
        res.send(error);
    }}

module.exports = {newEvent, getEvent, deleteEvent}