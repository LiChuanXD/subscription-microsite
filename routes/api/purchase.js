const express = require('express');
const Member = require('../../model/memberModel');
const Outlet = require('../../model/outletModel');

const router = express.Router();

//update member and outlet -put- /api/purchase
router.put('/' , (req , res)=>{
    const { number , outlet , a , b } = req.body;
    //object for later
    const newPurchase = {
        outlet,
        a,
        b
    };

    //find user
    Member.findOne({number}).then(x=>{
        if(!x){
            //if not found
            res.status(400).json({msg : "User not found"});
        }else{
            //found
            //check user purchase.length
            if(x.purchases.length === 4){
                return res.status(400).json({msg : "User quota reached"})
            };

            //check outlet
            Outlet.findOne({outlet}).then(y=>{
                const filter = y.members.filter(z=>z.number === number);
                if(!filter[0]){
                    //first purchase
                    Outlet.findOneAndUpdate({outlet} , {$push : {members : {name : x.name , number : x.number , purchase : 1}}})
                        .findOneAndUpdate({outlet} , {$inc : {available : -1 , a , b}})
                        .then(x=>res.end())
                        .catch(err=>console.log(err));

                    Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                        .then(x=>res.end())
                        .catch(err=>console.log(err));
                    
                }else{
                    if(filter[0].purchase === 1){
                        Outlet.findOneAndUpdate({outlet} , {members : {name : x.name , number : x.number , purchase : 2}})
                            .findOneAndUpdate({outlet} , {$inc : {available : -1 , a , b}})
                            .then(x=>res.end())
                            .catch(err=>console.log(err));

                        Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                            .then(x=>res.end())
                            .catch(err=>console.log(err));

                    }else if(filter[0].purchase === 2){
                        Outlet.findOneAndUpdate({outlet} , {members : {name : x.name , number : x.number , purchase : 3}})
                            .findOneAndUpdate({outlet} , {$inc : {available : -1 , a , b}})
                            .then(x=>res.end())
                            .catch(err=>console.log(err));

                        Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                            .then(x=>res.end())
                            .catch(err=>console.log(err));

                    }else if(filter[0].purchase === 3){
                        Outlet.findOneAndUpdate({outlet} , {members : {name : x.name , number : x.number , purchase : 4}})
                            .findOneAndUpdate({outlet} , {$inc : {available : -1 , a , b}})
                            .then(x=>res.end())
                            .catch(err=>console.log(err));

                        Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                            .then(x=>res.end())
                            .catch(err=>console.log(err));

                    }else if(filter[0].purchase === 4){
                        res.status(400).json({msg : "User quota reached"})
                    }
                }
            }).catch(err=>console.log(err));
        }
    }).catch(err=>console.log(err));
});

module.exports = router;