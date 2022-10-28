const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const policySchema = new Schema({
     IPolicy:{type:String,required:false},
     PPolicy:{type:String,required:false},
     RPolicy:{type:String,required:false},
      
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const policy = mongoose.model('Policies', policySchema);
module.exports = policy;
