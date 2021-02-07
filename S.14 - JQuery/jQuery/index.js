// Ready method to safeguard against JS script loading in the improper order from index.html
// $(document).ready(function () {
//     $("h1").css("color", "red");
//     $("button").css("color", "green");


// })

    // var numButtons = document.querySelectorAll("button").length;

    // for (var i = 0; i < numButtons; i++) {
    //     document.querySelectorAll("button")[i].addEventListener("click", function () {
    //         document.querySelector("h1").style.color = "red";
    //     });
    // }

    $("button").click(function() {
        $("h1").css("color", "purple");
    })

    $(document).keypress(function (event) {
        // console.log(event.key);
        $("h1").text(event.key);
        

    });