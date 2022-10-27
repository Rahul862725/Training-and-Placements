const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const faqSchema = new Schema({
     Question:{type:String,required:false},
     Answer:{type:String,required:false},
     Related:{type:String,required:false},
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const faq = mongoose.model('FAQ', faqSchema);
module.exports = faq;
