const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const TaskSchema = new mongoose.Schema({
    title  : {
        type: String,
        required: true
    },
    desc  : {
        type: String,
        required: true
    },
    isCompleted  : {
        type: Boolean,
        default : false

    },
  
},{timestamps : true})





module.exports = mongoose.model('Task', TaskSchema)
