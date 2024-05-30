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
   /* if (score >= 1000) {
        toggleTheme();
    }*/
    moveBlock();
    
    }, 1000);
   
}

function moveBlock() {
    if (score < 1000) {
        block.classList.add("moveblock");
    } else if (score >= 1000 && score < 2000) {
        if (block.classList.contains("moveblock")) {
            block.classList.remove("moveblock");
            block.classList.add("moveblock-fast");
        }
    } else if (score >= 2000 && score < 3000) {
        if (block.classList.contains("moveblock-fast")) {
            block.classList.remove("moveblock-fast");
            block.classList.add("moveblock-faster");
        }
    } else if (score >= 3000) {
        if (block.classList.contains("moveblock-faster")) {
            block.classList.remove("moveblock-faster");
            block.classList.add("moveblock-fastest");
        }
    }
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
       // moveBlock();
        //block.classList.add("moveblock-fast");
        startTimeandScore();
        checkDeadInterval = setInterval(function() {
            var characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
            var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
            if (blockLeft < 90 && blockLeft > 50 && characterBottom <= 20) {
                block.classList.remove("moveblock", "moveblock-fast", "moveblock-faster", "moveblock-fastest");
                playSound("lose");
                alert("You lost, your score is:  " + score + " !");
                stopTimer();
                clearInterval(checkDeadInterval);
                resetTimeandScore();
            }
        }, 10);

    }
}

// Function to toggle the theme
/*function toggleTheme() {
    document.body.classList.toggle("inverted-theme");
}*/
document.addEventListener("click", jump);

