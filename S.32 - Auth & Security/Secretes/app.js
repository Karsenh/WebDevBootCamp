//jshint esversion:6
// dotenv must be placed at the top to make all environmental variables global
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-Parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// express-session for session management
const session = require('express-session');
// passport for authentication
const passport = require('passport');
// passportLocalMongoose to simply building username & password login with Passport
const passportLocalMongoose = require('passport-local-mongoose');
/**
 * Old techqniue using bcrypt (see update with passport)
 */
// const md5 = require('md5');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();

/**
 * MIDDLEWARE
 */
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
// Fix deprecation warning
mongoose.set("useCreateIndex", true);

/**
 * DB SCHEMA
 */
// Create an object from the Mongoose Schema class
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

// Add and enable plugin to our mongoose user schema (must be mongoose)
userSchema.plugin(passportLocalMongoose);

// Add encyrption plugin to user schema and define the field using the secret to encrypt
// Mongoose will Encrypt while calling 'save' and Decrypt while calling 'find'
// (moved to hashing)
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);

// Local strategy to authenticate users using their username and password
passport.use(User.createStrategy());

// Only necessary when using sessions || much shorter using passport-local-mongoose
// Serializing users creates 'fortune cookie', stuffing info into the cookie
passport.serializeUser(User.serializeUser());
// Allows passport to 'crumble' the cookie to attain info in cookie
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

app.get("/secrets", function(req, res) {
    if(req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function(req, res) {
    // Deauthenticate user and end session using passport
    req.logout();
    res.redirect("/");
});

app.post("/register", function (req, res) {

    User.register({ username: req.body.username }, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                // Successfully authenticated and established a cookie
                res.redirect("/secrets");
            });
        }
    });

    /**
     * Old Technique using bcrypt (see above for passport)
     */
    // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: hash
    //     });
        // Mongoose will encrypt password at this stage
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

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    req.login(user, function(err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secrets");
            });
        }
    });

    /**
     * Old Technique using Bcrypt (see above for Passport)
     */
    // const username = req.body.username;
    // Hash password using bcrypt
    // const password = req.body.password;

    // Mongoose will decrypt password at this stage
    // User.findOne({
    //     email: username
    // }, function (err, foundUser) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         if (foundUser) {
    //             bcrypt.compare(password, foundUser.password, function(err, result) {
    //                 if (result === true) {
                        // Password = db password
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