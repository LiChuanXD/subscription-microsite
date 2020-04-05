const express = require('express');
const Outlet = require('../../model/outletModel');

const router = express.Router();

//create static data using postman -post- /api/outlet
router.post('/' , (req , res)=>{
    const { outlet , available } = req.body;
    const newOutlet = new Outlet({
        outlet,
        available
    });

    newOutlet.save().then(x=>res.status(200).json(x)).catch(err=>console.log(err));
});

//get all outlet data -get- /api/outlet
router.get('/' , (req , res)=>{
    Outlet.find().then(x=>res.status(200).json(x)).catch(err=>console.log(err));
});

module.exports = router;