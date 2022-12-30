const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const studentSchema = new Schema({
     Name:{type:String,required:true},
     RollNo:{type:String,required:true},
     Gender:{type:String,required:false},
     Course:{type:String,requierd:false},
     Profile:{type:String,requierd:false},
     Branch:{type:String,required:false},
     Batch:{type:String,required:false},
     Company:{type:String,required:false},
     Package:{type:String,required:false},
     TwoMInternship:{type:Boolean,required:false, default: false},
     SixMInternship:{type:Boolean,required:false, default: false},
     FTE:{type:Boolean,required:false, default: false},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const student = mongoose.model('Student', studentSchema);
module.exports = student;
