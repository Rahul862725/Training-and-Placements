const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const informationSchema = new Schema({
    ID:{type:String,required:true},
    Annoucement:[{type:String,required:false}],
    Notes:[{type:String,required:false}],
  
  date: { type: Date, required: false  , default: Date.now},
}, {
    timestamps: true,
});

const information = mongoose.model('Information', informationSchema);
module.exports = information;
