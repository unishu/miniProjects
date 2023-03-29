var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let petSchema = new Schema({

    name: { type: String, required: true},
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
    species: {type: String},
    breed: { type: String},
    sex: {type:String},
    birthday: { type: Date },
    registrationId: { type: String, required: true, unique: true},
    gender: { type: String},
    weight: {type: String},
    //isDefault: { type: Boolean },
    //contactTypes: [],
    address: [{ type: Schema.Types.ObjectId, required: true, ref: 'users' }],
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},
{timestamps: true});

/*
    createdAt: { type: Date , default: Date.now, required: true },  // or use timestamps:true,
    updatedAt: { type: Date , dfault: Date.now, //required: true
 } 
}); */



module.exports = mongoose.model('pets', petSchema);