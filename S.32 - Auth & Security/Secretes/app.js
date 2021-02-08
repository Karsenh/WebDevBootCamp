//jshint esversion:6
// dotenv must be placed at the top to make all environmental variables global
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-Parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const password = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
/**
 * Old techqniue using bcrypt (see update with passport)
 */
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;


const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

// Passport use session package with configs
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// Initialize passport to be used for managing sessions
app.use(passport.initialize());
// Passport uses session 
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set("useCreateIndex", true);

// Create an object from the Mongoose Schema class
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Add a plugin to our mongoose user schema (must be mongoose)
userSchema.plugin(passportLocalMongoose);


// Add encyrption plugin to user schema and define the field using the secret to encrypt
// Mongoose will Encrypt while calling 'save' and Decrypt while calling 'find'
// (moved to hashing)
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {



    /**
     * Old Technique using bcrypt (see above for passport)
     */
    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //     });
    //     // Mongoose will encrypt password at this stage
    //     newUser.save(function (err) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.render("secrets")
    //         }
    //     });
    // })
});

app.post("/login", function (req, res) {

    


    /**
     * Old Technique using Bcrypt (see above for Passport)
     */
    // const username = req.body.username;
    // // Hash password using bcrypt
    // const password = req.body.password;

    // // Mongoose will decrypt password at this stage
    // User.findOne({
    //     email: username
    // }, function (err, foundUser) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (foundUser) {
    //             bcrypt.compare(password, foundUser.password, function(err, result) {
    //                 if (result === true) {
    //                     // Password = db password
    //                     res.render("secrets");
    //                 }
    //             });
                
    //         }
    //     }
    // });
});



app.listen(3000, function () {
    console.log("Successfully started Secretes app on port 3000!");
});