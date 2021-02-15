require('dotenv').config();
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

// Allows parsing through the body of the POST request
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendfile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const apiKey = process.env.API_KEY;
    const cityQuery = req.body.cityName;
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {
        console.log(response);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const cityName = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const weatherImage = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Farenheit.</h1>");
            res.write("<p>It's looking like " + weatherDescription + "</p>");
            res.write('<img src="' + weatherImage + '" alt="Weather Icon">');

            res.send();

        })
    })
});






app.listen(3000, function () {
    console.log("Successfully started server on port 3000!");
})