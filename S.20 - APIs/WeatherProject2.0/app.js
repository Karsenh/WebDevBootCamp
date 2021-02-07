const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {

    const cityQuery = req.body.cityName;
    const apiKey = "6b5cf02635da88f51abb3d0965a9ef01"
    const units = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityQuery + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response) {

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            var unitText = "";
            
            switch(units) {
                case "imperial":
                    unitText = "Farenheit";
                    break;
                case "metric":
                    unitText = "Celcius";
                    break;
                default:
                    unitText = "ERROR fetching units";
                    break;
            }

            res.write("<h1>The temperature in " + cityQuery + " is " + temp + " degrees " + unitText + "</h1>");
            
            const weatherDescription = weatherData.weather[0].description;
            res.write("<p>Looks like " + weatherDescription + "</p>");

            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<img src= " + imageUrl + ">")

        });
    });
});

app.listen(3000, function () {
    console.log("Successfully started server on port 3000!");
})