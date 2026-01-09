const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();
const dbgr = require("debug")("development:mongoose");


mongoose
.connect(process.env.MONGODB_URI)
.then(function(){
    dbgr("Connected to MongoDB");
})
.catch(function(err){
    dbgr("Error connecting to MongoDB:", err);
})

module.exports = mongoose.connection;