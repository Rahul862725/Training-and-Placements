const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
     Name:{type:String,required:true},
     Email:{type:String,required:true},
     Pass:{type:String,required:true},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const faculty = mongoose.model('User', userSchema);
module.exports = faculty;
