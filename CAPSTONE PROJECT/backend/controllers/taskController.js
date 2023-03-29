'use strict'
const models = require("../models");
const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");



const getTask = asyncHandler(
    async (req, res) => {
        try {
            const tasks = await models.Tasks.find();
            res.send(tasks);
        } catch (error) {
            res.send(error);
        }
       /* const task = await models.Tasks.find({})
        res.json(task)
       //console.log({userId: req.user._id}) */

    });


    const addTask = async (req, res) => {
        try {
            const task = await new models.Tasks(req.body).save();
            res.send(task);
        } catch (error) {
            res.send(error);
        }
    
    /*let {content, userId} = req.body
    console.log(req.body)

    const task =  new models.Tasks({content, userId});
    console.log(userId)

    const existingTask = await task.save();
    res.status(200).json(existingTask)
    console.log(userId) */
}


const deleteTask = async (req, res) => {
    try {
        const task = await models.Tasks.findByIdAndDelete(req.params.id);
        //res.send(task);
        res.status(200).json({message: "Record deleted"})
    } catch (error) {
        res.send(error);
    }
    /*const task = await models.Tasks.findById(req.params.id);


    if (task) {
        await task.remove();
        //res.send(req.params)
        res.json({message: "Record deleted"})
    } else {
        res.status(404).json({ error: "Task deleted"})
        //throw new Error("Record not found")
    }*/
};

const updateTask = async (req, res) => {
    try {
        const task = await models.Tasks.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        //res.send(task);
        res.status(200).json({message: "Record updated", task:task})
    } catch (error) {
        res.send(error);
    }
}


module.exports ={ addTask, deleteTask, getTask, updateTask}
