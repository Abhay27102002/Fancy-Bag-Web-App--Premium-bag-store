const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

const db = require("./config/mongoose-connection");
const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//owner se related saare request ownersRouter pe aayega
app.use("/owners", ownersRouter);
//user se related saare request usersRouter pe aayega
app.use("/users",usersRouter);
//product se related saare request productsRouter pe aayega
app.use("/products",productsRouter);

app.listen(3000);