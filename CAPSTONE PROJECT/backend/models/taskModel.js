const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


let taskSchema = new Schema ({
    task: { type: String, required: true },
    completed: { type: Boolean, default: false},
    userId: [{ type: Schema.Types.ObjectId, required: true, ref: 'users'}],
    date: { type: Date, default: Date.now},
    
},
{timestamps: true});


module.exports = mongoose.model('tasks', taskSchema);