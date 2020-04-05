const express = require('express');
const Member = require('../../model/memberModel');

const router = express.Router();

//register -post- /api/user/register
router.post('/register' , (req , res)=>{
    const { name , number } = req.body;
    if(!name || !number){
        return res.status(400).json({msg : "Please enter all fields"});
    };

    const newMember = new Member({
        name,
        number
    });

    Member.findOne({number}).then(x=>{
        if(!x){
            //register
            newMember.save().then(y=>res.status(200).json(y)).catch(err=>console.log(err))
        }else{
            //already exist
            res.status(400).json({msg : "User with this phone number already exist"})
        }
    }).catch(err=>console.log(err));
});

//login -post- /api/user/login
router.post('/login' , (req , res)=>{
    const {number} = req.body;
    if(!number){
        return res.status(400).json({msg : "Please enter all the fields"});
    };

    Member.findOne({number}).then(x=>{
        if(!x){
            //not found
            res.status(400).json({msg : "User not found"});
        }else{
            //login
            res.status(200).json(x)
        }
    }).catch(err=>console.log(err))
});

//to get all users data -get- /api/user/all
router.get('/all' , (req , res)=>{
    Member.find().then(x=>res.status(200).json(x)).catch(err=>console.log(err))
});

//to get single user data -get- /api/user/:id
router.get('/:id' , (req , res)=>{
    const { id } = req.params
    Member.findOne({_id : id}).then(x=>res.status(200).json(x)).catch(err=>console.log(err));
});


module.exports = router;