var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let recordModel = new Schema({

    petName: { type: String, required: true},
    //color: { type: String},
    //age: {type: String},
    //birthDate: {type: Date},
    petId: [{ type: Schema.Types.ObjectId, required: true, ref: 'pets' }],
    userId: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
    address: [{ type: String, ref: 'users' }],
    vet:[{
        name: {type: String},
        contact: { type: String}
    }],
    healthConcerns: [{
        allergies: {type: String},
        medication: {type: String},
        exisitingConditions: {type: String},
        history: {type: String}
    }],
    vaccinations: {type: String},
    recordImage: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{timestamps: true});


module.exports = mongoose.model('records', recordModel)
