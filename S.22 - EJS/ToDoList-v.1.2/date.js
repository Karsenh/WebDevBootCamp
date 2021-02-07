//jshint esversion:6

module.exports.getDate = getDate;

function getDate() {
    var date = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    
    var dateFormatted = date.toLocaleDateString('en-US', options);

    return dateFormatted;
}

module.exports.getDay = getDay;

function getDay() {
    var date = new Date();

    var options = {
        weekday: "long"
    }
    
    var dateFormatted = date.toLocaleDateString('en-US', options);

    return dateFormatted;
}

