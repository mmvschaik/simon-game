let buttonColours = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function() {
    if (!started) {
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function() {
    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => { nextSequence(); }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key To Restart');
        setTimeout(() => { $('body').removeClass('game-over'); }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text(`Level ${level}`);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(userChosenColour) {
    $(`#${userChosenColour}`).addClass('pressed');
    setTimeout(() => { $(`#${userChosenColour}`).removeClass('pressed'); }, 100);
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
