const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const policySchema = new Schema({
     Policy:{type:String,required:true},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const policy = mongoose.model('Policies', policySchema);
module.exports = policy;
