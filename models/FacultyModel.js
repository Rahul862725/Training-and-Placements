const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const facultySchema = new Schema({
     Name:{type:String,required:true},
     Dept:{type:String,required:true},
     Mob_No:{type:String,required:true},
     Email:{type:String,required:true},
     Des:{type:String,required:true},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const faculty = mongoose.model('Faculty', facultySchema);
module.exports = faculty;
