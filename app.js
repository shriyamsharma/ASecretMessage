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

app.use(bodyParser.urlencoded({extended:true}));

//setting passport to work with application
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//to read the session and encoding, decoding the session
//serializeUser & deserializeUser coming from passportLocalMongoose Method from user model
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//====================================================================================================================
// Routes

app.get('/', function(req, res){    
    res.render("home");
});

app.get("/secret", function(req, res){  
    res.render("secret");
});

//Auth Routes

//sign up form
app.get("/register", function(req, res){
    res.render("register");
});

//handle sin up
app.post("/register", function(req, res){
    // res.send("Register POST Route");

    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

//LOGIN ROUTES

//render login form
app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res){
    
});


//running server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})