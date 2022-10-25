const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const processSchema = new Schema({
    Process:{type:String,required:true},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const process = mongoose.model('Process', processSchema);
module.exports = process;
