//jshint esversion:6
// dotenv must be placed at the top to make all environmental variables global
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-Parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const md5 = require('md5');

const app = express(); 

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true});

// Create an object from the Mongoose Schema class
const userSchema = new mongoose.Schema ({
    email: String,
    password: String
});


// Add encyrption plugin to user schema and define the field using the secret to encrypt
// Mongoose will Encrypt while calling 'save' and Decrypt while calling 'find'
// (moved to hashing)
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password'] });

const User = new mongoose.model("User", userSchema);

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    });

    // Mongoose will encrypt password at this stage
    newUser.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.render("secrets")
        }
    });
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);

    // Mongoose will decrypt password at this stage
    User.findOne({email: username}, function(err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                if(foundUser.password === password) {
                    res.render("secrets");
                }
            }
        }
    });
});



app.listen(3000, function() {
    console.log("Successfully started Secretes app on port 3000!");
});