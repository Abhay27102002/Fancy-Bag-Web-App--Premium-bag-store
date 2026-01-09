const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

//This package will enable to use all variable from .env file
require("dotenv").config();

const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//setting up sessions

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

//setting up flash
app.use(flash());

//owner se related saare request ownersRouter pe aayega
app.use("/owners", ownersRouter);
//user se related saare request usersRouter pe aayega
app.use("/users",usersRouter);
//product se related saare request productsRouter pe aayega
app.use("/products",productsRouter);
//index route
app.use("/", indexRouter);


app.listen(3000);