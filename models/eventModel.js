var mongoose = require('mongoose');
  
var eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String,
    location: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('Event', eventSchema);