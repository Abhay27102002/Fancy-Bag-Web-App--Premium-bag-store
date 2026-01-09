const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const {generateToken}= require("../utils/generateToken");


module.exports.registerUser= async function(req,res){
    try{
        let {email,password,fullname} = req.body;
        //checking if the user is already registered  
        let user = await userModel.findOne({email: email});
        if (user){
            req.flash("error", "User Already Registered, Please Login!!");
            return res.redirect("/");
        }
        //creating a new user
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(password, salt, async function(err,hash){
                if(err){ 
                    req.flash("error", err.message);
                    return res.redirect("/");
                }
                let user = await userModel.create({
                    email,
                    password:hash,
                    fullname,
                });
                let token=generateToken(user);
                res.cookie("token",token)
                req.flash("success", "User Created Successfully"); 
                res.redirect("/");
            })

        })
        
        
    }
    catch(err){
        res.send(err.message);
    }
};

module.exports.loginUser = async function(req,res){
    let {email, password} = req.body;
    //check if email is registered or not
    let user= await userModel.findOne({email: email});
    if(!user) return res.send("Email and password are incorrect");

    //if email is correct then we have verify the password
    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        }
        else{
            res.send("Email and password are incorrect");
        }
    })
}

module.exports.logout = function(req,res){
    res.cookie("token", "");
    res.redirect("/");
}