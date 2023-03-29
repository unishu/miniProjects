'use strict'

const models = require("../models");
const asyncHandler = require("express-async-handler");
const { model } = require("mongoose");

const getRecord = asyncHandler(
    async (req, res) => {
        const record = await models.Records.find({userId: req.user._id})
        res.json(record)
        console.log({userId: req.user._id})
        

 });

 const addRecord = asyncHandler(
    async (req, res) => {
        let {petName, petId, userId, vet, healthConcerns, vaccinations, recordId, name} = req.body;

        //const recordExists = await models.Pets.findOne({name}); 
         const recordExists = await models.Records.findOne({petName});
        console.log(recordExists)
        //console.log({petId: req.pet._id})

        if (recordExists) {
        res.status(400).send({result:"Record already exists"}) 
        //throw new Error("User already exists");
            
      
        }else {

            const record = new models.Records({petName, petId, userId, vet, healthConcerns, vaccinations, userId: req.user._id});

            const existingRecord = await record.save();
            console.log({userId: req.user.id})
            console.log({PET: petId})
            //console.log({petId: req.pet._id})
            res.status(200).json(existingRecord)
        }
    }
    );



    const getRecordById = async (req, res) => {
        let record=  await  models.Records.findById(req.params.id) 
                console.log(req.params);
                if (record) {
                    res.json(record);
                }else {
                    res.status(404).send({message: "record not found"});
        }
    }

    /*
    const getRecordById = (req, res) => {
        models.Records.findById(req.params.id, (err, data) => {
            console.log(req.params);
            if (err) throw err;
            res.send({result: 200, data: data})
          });
    }
    

    /*const getRecordById = asyncHandler( async (req, res) =>{
        const record = await models.Records.findById(req.params._id);

        if (record) {
            res.json(record);
        }else {
            res.status(404).send({message: "record not found"});
        }
    });

    
*/



 
    
    const updateRecord = asyncHandler( async (req, res) => {
        const {petName, vet, healthConcerns, vaccinations, recordImage} = req.body;

        const record = await models.Records.findById(req.params.id);

       /* if(pet.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error ("You can't perform this action");
        } */

        if (record) {
            record.petName = petName;
            record.vet = vet;
            record.healthConcerns = healthConcerns;
            record.vaccinations = vaccinations;
            record.recordImage = recordImage;
            

            const updatedRecord = await record.save();
            res.status(200).json(updatedRecord);
        
        } else {
            res.status(404);
            throw new Error("Record not found");
        }

    });

    const deleteRecord = asyncHandler( async (req, res) => {
        const record = await models.Records.findById(req.params.id);

        /*if (pet.user.toString() !== req.user._id.toString()) {
            res.status(404);
            throw new Error ("You can't perform this action");
        } */

        if (record) {
            await record.remove();
            //res.send(req.params)
            res.json({message: "Record deleted"})
        } else {
            res.status(404);
            throw new Error("Record not found")
        }
    });

    const searchRecord = asyncHandler( async (req, res) => {
        const search = req.query.search || "";
        let result = await models.Records.find({
            "$or": [
                {
                    petName: { $regex: req.params.key, '$options' : 'i'}
                },
                
            ]
        });
        res.send(result)
        console.log(result)
    })





  
        
    


    module.exports = {getRecord, addRecord, updateRecord, getRecordById, deleteRecord, searchRecord}