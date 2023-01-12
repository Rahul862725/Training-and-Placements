const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const processSchema = new Schema({
    IProcess:{type:String,required:false},
    PProcess:{type:String,required:false},
    RProcess:{type:String,required:false},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const process = mongoose.model('Process', processSchema);
module.exports = process;
