'use strict'

const models = require("../models/");
const asyncHandler = require("express-async-handler")

const getPets = asyncHandler(
    async (req, res) => {
        const pets = await models.Pets.find({userId:req.user._id})
        console.log({userId:req.user._id})
        res.json(pets)
        console.log(pets)

 });


 const registerPet = asyncHandler(
    async (req, res) => {
        let {name, species, breed, birthday, sex, weight, registrationId, userId, address} = req.body;

        const petExists = await models.Pets.findOne({registrationId});
        console.log(registrationId) 

        if (petExists) {
        res.status(400).send({result:"Pet already exists"}) 
        //throw new Error("User already exists");
            
        }else{
            if (!name || !species || !breed || !birthday || !sex || !weight || !registrationId ){
            res.status(400)
            throw new Error ("please fill all the fields")
        }else {

            const pet = new models.Pets({name, species, breed, birthday, sex, weight, registrationId, userId: req.user.id, address});

            const registeredPet = await pet.save();
            console.log(registeredPet)
            console.log({INFO: pet.userId})
            res.status(201).json(registeredPet)
        }
    }
    });


    const getPetById = asyncHandler( async (req, res) =>{
        const pet = await models.Pets.findById({_id:req.params.id});

        if (pet) {
            res.json(pet);
        }else {
            res.status(404).send({message: "Pet not found"});
        }
    });

    const updatePet = asyncHandler( async (req, res) => {
        const {name, species, breed, birthday, sex, weight, registrationId, pic} = req.body;

        const pet = await models.Pets.findById({_id: req.params.id});  
        console.log (`REQ PARAMS ID` +" " + req.params.id)
        console.log(`PET USER ID` + " " + pet.userId)

      
        if(pet.userId.toString() !== req.user._id.toString()) {
            
            res.status(401);
            throw new Error ("You can't perform this action");
        } 

        if (pet) {
            pet.name = name;
            pet.species = species;
            pet.breed = breed;
            pet.birthday = birthday;
            pet.sex = sex;
            pet.weight = weight;
            pet.registrationId = registrationId;
            pet.pic = pic;

            const updatedPet = await pet.save();
            res.status(200).json(updatedPet);
        
        } else {
            res.status(404);
            throw new Error("Pet not found");
        }

    });

    const deletePet = asyncHandler( async (req, res) => {
        const pet = await models.Pets.findById(req.params.id);

        if (pet.userId.toString() !== req.user._id.toString()) {
            res.status(404);
            throw new Error ("You can't perform this action");
        } 

        if (pet) {
            await pet.remove();
            res.send(req.params)
            //res.json({message: "Pet removed"})
        } else {
            res.ststaus(404);
            throw new Error("Pet not found")
        }
    })


    const searchPet = asyncHandler( async (req, res) => {
        let result = await models.Pets.find({
            "$or": [
                {
                    name: {$regex: req.params.key, '$options' : 'i'}
                },
                {
                    species: {$regex: req.params.key, '$options' : 'i'}
                },
                {
                    breed: {$regex: req.params.key, '$options' : 'i'}
                },
                {
                    sex: {$regex: req.params.key, '$options' : 'i'}
                }, 
                {
                    registrationId: {$regex: req.params.key}
                }
                
                
            ]
        });
        res.send(result)
        console.log(result)
    })

    

 module.exports = {getPets, registerPet, getPetById, updatePet, deletePet, searchPet}


 /*

 const addPetRecord = asyncHandler(
        async (req, res) => {
            let {petName,  petId, userId, vet, healthConcerns, vaccinations, recordId,name} = req.body;
         
    
            const recordExists = await models.Pets.findOne({name}); 
            //console.log({userId:req.user._id})
            console.log(petId)
    
            if (recordExists) {
            res.status(400).send({result:"Record already exists"}) 
            //throw new Error("User already exists");
                
          
            }else {
    
                const record = new models.Records({petName, petId,  userId, vet, healthConcerns, vaccinations, userId: req.user._id});
    
                const existingRecord = await record.save();
                console.log({userId: req.user.id})
                console.log(petId)
                //console.log({petId: req.pet._id})
                res.status(200).json(existingRecord)
            }
        }
        ); */