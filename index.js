var level = 0;
var colorSeq = ["green", "red", "yellow", "blue"]
var started = false;
var gamePattern = [];
var userPattern = [];

$(document).keypress(function () {
    if (!started) {
        started = true;
        generateSequence();
    }
});

function generateSequence() {
    ++level;
    userPattern = [];
    $("h1").text("Level " + level);
    var random = Math.floor(Math.random() * 4);
    gamePattern.push(colorSeq[random]);
    // console.log(colorSeq[random]);
    $("#" + colorSeq[random]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorSeq[random]);
}

$(".game").click(function () {
    var userClicked = $(this).attr("id");
    $(this).fadeIn(100).fadeOut(100).fadeIn(100);
    userPattern.push(userClicked);
    playSound(userClicked);
    check();
})

function check() {
    var ind = userPattern.length - 1;
    if (gamePattern[ind] === userPattern[ind]) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(function () {
                generateSequence();
            }, 1000);
        }
    }
    else {
        started = false;
        level = 0;
        gamePattern = [];
        userPattern = [];
        playSound("wrong")
        $("body").addClass("wrong");
        $("h1").text("Game Over, Press Any Key to Continue");
        setTimeout(function ()
        {
            $("body").removeClass("wrong");
        }, 500)
    }
}

function playSound(src) {
    var audi = new Audio("./sounds/" + src + ".mp3");
    audi.play();
}