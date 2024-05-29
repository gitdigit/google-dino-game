var character = document.getElementById("character");
var block = document.getElementById("block");
var startButton = document.getElementById("start-btn");
let timerElement = document.getElementById("timer");
let scoreElement = document.getElementById("scorer");
let score = 0;
let time = 0;
let timerInterval;
let checkDeadInterval;

function jump() {
    if (!character.classList.contains("animate")) {
        character.classList.add("animate");
    }
    setTimeout(function() {
        character.classList.remove("animate");
    }, 500);
    playSound("jump");
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function playWav(name) {
    var audio = new Audio("sounds/" + name + ".wav");
    audio.play();
}

function startTimeandScore() {
    timerInterval = setInterval(() => {
        time++;
        score = time * 100;
        timerElement.innerText = `Time: ${time}s`;
        scoreElement.innerText = `Score: ${score}`;
        
        if(score%1000 === 0){
        playWav("nextmille");

    }
    }, 1000);
   
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimeandScore() {
    time = 0;
    score = 0;
    timerElement.innerText = `Time: ${time}s`;
    scoreElement.innerText = `Score: ${score}`;
}

function iniGame() {
    return startButton.classList.remove("inverted");
}

function startGame() {
    if (!iniGame()) {
        block.classList.add("moveblock");
        startTimeandScore();
        checkDeadInterval = setInterval(function() {
            var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
            var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            if (blockLeft < 90 && blockLeft > 50 && characterBottom <= 20) {
                block.classList.remove("moveblock");
                alert("You lost, your score is:  " + score + " !");
                playSound("lose");
                stopTimer();
                clearInterval(checkDeadInterval);
                resetTimeandScore();
            }
        }, 10);

    }
}

document.addEventListener("click", jump);
