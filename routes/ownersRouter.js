const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

//DEVELOPMENT ROUTES
//create krne wala route sirf "development" environment me available hona chaiyee
if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
        //we dont allow more then 1 owner so it is the check for number of owners.
        let owners=await ownerModel.find();
        if(owners.length > 0){
            return res
                .status(500)
                .send("you don't have permission to create a new owner");
        }

        let {fullname,email,password} = req.body;
        let createdOwner= await ownerModel.create({
            fullname,
            email,
            password,
        
        })
        res.status(201).send(createdOwner);         

    });
}

router.get ("/admin",async function(req,res){
    let success = req.flash("success");
    res.render("createproducts", {success:success});
});


//process ka node environment ky chal rha hai
//console.log(process.env.NODE_ENV);




module.exports = router;