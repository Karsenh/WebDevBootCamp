//jshint esversion:6

const express = require('express');
const app = express();

app.get("/", function (req, res) {
    res.send("<h1>Hello World!</h1>")
});

app.get("/about", function(req, res) {
    res.send("<h1>About Me:</h1> <br>");
});

app.get("/hobbies", function(req, res) {
    res.send("<h1>This is the shit I like</h1>");
});

app.listen(3000, function () {
    console.log("Server successfully started on port 3000!");
});