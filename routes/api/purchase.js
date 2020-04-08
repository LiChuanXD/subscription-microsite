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

    if(parseInt(a) + parseInt(b) < 6){
        return res.status(400).json({msg : "Minimum to buy 6 items"});
    };
    if(parseInt(a) + parseInt(b) > 6){
        return res.status(400).json({msg : "Maximum to buy 6 items"});
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

                    //outlet -1, then member push 1 item, then json member
                    Outlet.findOneAndUpdate({outlet} , {$push : {members : {name : x.name , number : x.number , purchase : 1}}})
                        .findOneAndUpdate({outlet} , {$inc : {available : -1 , a , b}})
                        .then(x=>{
                            Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                            .then(y=>{
                                Member.findOne({number : y.number})
                                    .then(z=>res.status(200).json(z.purchases[z.purchases.length -1]))
                                    .catch(err=>console.log(err))
                            })
                            .catch(err=>console.log(err));
                        })
                        .catch(err=>console.log(err));

                }else{
                    if(filter[0].purchase === 1){
                        //same person second purchase
                        Outlet.findOneAndUpdate({outlet} , {members : {name : x.name , number : x.number , purchase : 2}})
                            .findOneAndUpdate({outlet} , {$inc : {a , b}})
                            .then(x=>{
                                Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                                .then(y=>{
                                    Member.findOne({number : y.number})
                                        .then(z=>res.status(200).json(z.purchases[z.purchases.length -1]))
                                        .catch(err=>console.log(err))
                                })
                                .catch(err=>console.log(err));
                            })
                            .catch(err=>console.log(err));
                        

                    }else if(filter[0].purchase === 2){
                        //same person third purchase
                        Outlet.findOneAndUpdate({outlet} , {members : {name : x.name , number : x.number , purchase : 3}})
                            .findOneAndUpdate({outlet} , {$inc : {available : -1 , a , b}})
                            .then(x=>{
                                Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                                .then(y=>{
                                    Member.findOne({number : y.number})
                                        .then(z=>res.status(200).json(z.purchases[z.purchases.length -1]))
                                        .catch(err=>console.log(err))
                                })
                                .catch(err=>console.log(err));
                            })
                            .catch(err=>console.log(err));


                    }else if(filter[0].purchase === 3){
                        //same person forth purchase
                        Outlet.findOneAndUpdate({outlet} , {members : {name : x.name , number : x.number , purchase : 4}})
                            .findOneAndUpdate({outlet} , {$inc : {a , b}})
                            .then(x=>{
                                Member.findOneAndUpdate({number} , {$push : {purchases : newPurchase}})
                                .then(y=>{
                                    Member.findOne({number : y.number})
                                        .then(z=>res.status(200).json(z.purchases[z.purchases.length -1]))
                                        .catch(err=>console.log(err))
                                })
                                .catch(err=>console.log(err));
                            })
                            .catch(err=>console.log(err));


                    }else if(filter[0].purchase === 4){
                        //5th stop
                        res.status(400).json({msg : "User quota reached"})
                    }
                }
            }).catch(err=>console.log(err));
        }
    }).catch(err=>console.log(err));
});

module.exports = router;