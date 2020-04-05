const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name : {type : String, required : true},
    number : {type : String , required : true , unique : true},
    purchases : [
        {
            a : {type : Number},
            b : {type : Number},
            outlet : {type : String},
            date : {type : Date , default : Date.now}
        }
    ]
},
{
    timestamps : true
});

const Member = mongoose.model("Member" , memberSchema);

module.exports = Member;