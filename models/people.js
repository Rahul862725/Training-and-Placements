const mongoose = require("mongoose");
//----------------------------------->

//Schema---------------------------->
const Schema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        department: {
            type: String,
        },
        designation: {
            type: String,
        },
        mobileno: {
            type: String,
        },
        email: {
            type: String,
        },
        show: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

//Model---------------------------->
const Model = mongoose.model("people", Schema);

//Export----------------------------->
module.exports = Model;

