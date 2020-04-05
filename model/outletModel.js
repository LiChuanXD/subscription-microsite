const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema({
    outlet : {type : String},
    available : {type : Number},
    members : [
        {
            name : {type : String},
            number : {type : String},
            purchase : {type : Number}
        }
    ],
    a : {type : Number},
    b : {type : Number}
});

const Outlet = mongoose.model("Outlet" , outletSchema);

module.exports = Outlet;