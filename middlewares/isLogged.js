const jwt= require("jsonwebtoken");
const userModel = require("../models/user-model");



module.exports = async function(req,res, next){
    //user has a cookie or not.
    if(!req.cookies.token){
        req.flash("error", "You need to login First");
        return res.redirect("/");
    }

    try{
        //if he has the cookie then we will decode the cookie using jwt.verify() and store it in decoded
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        //after getting the value from cookie, we will find the user data using the decoded data
        let user = await userModel
            .findOne({email: decoded.email})
            .select("-password");  //when we find the user, All the data of user comes but we dont need the password


        //we create a "user" in req and put the data of the user in that "user"
        req.user = user;
        next();
    }
    catch(err){
        req.flash("error","Something Went Wrong");
        res.redirect("/");
    }
}