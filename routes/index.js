const express = require("express");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const productModel = require("../models/product-model")
const userModel = require("../models/user-model");

router.get('/', (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false} );
});

router.get("/shop", isLogged,async  function(req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop",{products, success});
});

router.get("/cart", isLogged,async  function(req, res) {
    
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");

    // Calculate the total bill by iterating over all items
    let totalMRP = 0;
    let totalDiscount = 0;
    const platformFee = 20; // Fixed fee

    if (user.cart.length > 0) {
        user.cart.forEach(item => {
            totalMRP += Number(item.price);
            totalDiscount += Number(item.discount);
        });
    }

    const bill = (totalMRP + platformFee) - totalDiscount;

    // Pass calculated values to the template
    res.render("cart", { user, bill, totalMRP, totalDiscount, platformFee });
});


router.get("/addtocart/:id", isLogged,async  function(req, res) {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")
});

module.exports = router;