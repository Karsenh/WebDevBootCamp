//jshint esversion:6
// dotenv must be placed at the top to make all environmental variables global
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// express-session for session management
const session = require('express-session');
// passport for authentication
const passport = require('passport');
// passportLocalMongoose to simply building username & password login with Passport
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

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

mongoose.connect("mongodb+srv://admin-Karsen:4nP3tEVk@secretapp.2rxhx.mongodb.net/SecretApp?retryWrites=true&w=majority", {
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
    password: String,
    googleId: String,
    secret: String
});

// Add and enable plugin to our mongoose user schema (must be mongoose)
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

// Local strategy to authenticate users using their username and password
passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// // Allows passport to 'crumble' the cookie to obtain info in cookie
// passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://secret-310.herokuapp.com/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        // Create user in database
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/", function (req, res) {
    res.render("home");
});

// OAuth Routes
app.get("/auth/google",
    passport.authenticate("google", {
        scope: ["profile"]
    }));

app.get("/auth/google/secrets",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect("/secrets");
    });

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/register", function(req, res){
    res.render("register");
  });
  
  app.get("/secrets", function(req, res){
    User.find({"secret": {$ne: null}}, function(err, foundUsers){
      if (err){
        console.log(err);
      } else {
        if (foundUsers) {
          res.render("secrets", {usersWithSecrets: foundUsers});
        }
      }
    });
  });
  
  app.get("/submit", function(req, res){
    if (req.isAuthenticated()){
      res.render("submit");
    } else {
      res.redirect("/login");
    }
  });
  
  app.post("/submit", function(req, res){
    const submittedSecret = req.body.secret;
  
  //Once the user is authenticated and their session gets saved, their user details are saved to req.user.
    // console.log(req.user.id);
  
    User.findById(req.user.id, function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if (foundUser) {
          foundUser.secret = submittedSecret;
          foundUser.save(function(){
            res.redirect("/secrets");
          });
        }
      }
    });
  });

app.get("/logout", function (req, res) {
    // Deauthenticate user and end session using passport
    req.logout();
    res.redirect("/");
});

app.post("/register", function (req, res) {

    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                // Successfully authenticated and established a cookie
                res.redirect("/secrets");
            });
        }
    });

});

app.post("/login", function (req, res) {

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });

});



app.listen(process.env.PORT || 3000, function () {
    console.log("Successfully started Secretes app on port 3000!");
});