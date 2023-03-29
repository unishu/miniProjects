var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const eventSchema = new Schema({
    start: {type: Date},
    end: {type: Date},
    title: {type: String}
})

module.exports = mongoose.model('Event', eventSchema);