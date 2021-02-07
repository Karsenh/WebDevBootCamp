
var btnColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var move = 0;



function nextSequence() {

    var randNum = Math.floor(Math.random() * 4);
    console.log(randNum);

    var randomColor = btnColors[randNum];
    console.log("Next color = " + randomColor);

    var audio = new Audio("sounds/" + randomColor + ".mp3");
    audio.play();

    gamePattern.push(randomColor);
    console.log(gamePattern);

    for (var i = 0; i < gamePattern.length; i++) {
        $("#"+gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    }
}

$(".btn").click(nextSequence(), function (event) {
    var selectedBtnColor = $(this).attr('id')
    console.log("Event Details: " + selectedBtnColor);

    userClickedPattern.push(selectedBtnColor);
    console.log("User clicked sequence = " + userClickedPattern);

    if (userClickedPattern[move] == gamePattern [move]) {
        console.log("Correct selection on move " + move);
        move += 1;
        nextSequence()
    } else {
        console.log("Incorrect selection on move " + move);
        console.log("Game Over");
    }

});

