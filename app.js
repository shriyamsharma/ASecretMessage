var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var User = require("./models/user");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

const url = 'mongodb://localhost:27017/auth_demo_app';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const hostname = 'localhost';
const port = '3000';

var app = express();
app.set('view engine', 'ejs');

//include session
app.use(require("express-session")({
    name: "session",
    secret: "1234-4321",
    saveUninitialized: false,
    resave: false
}));


//setting passport to work with application
app.use(passport.initialize());
app.use(passport.session());

//to read the session and encoding, decoding the session
//serializeUser & deserializeUser coming from passportLocalMongoose Method from user model
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res){    
    res.render("home");
});

app.get("/secret", function(req, res){  
    res.render("secret");
});


//running server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})