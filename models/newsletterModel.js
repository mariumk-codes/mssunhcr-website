mongoose = require('mongoose')

var newslettersSchema = new mongoose.Schema({
    title: String,
    date: String,
    desc: String,
    file: String
})

module.exports = mongoose.model("Newsletter", newslettersSchema)