// The following variables below are all the sound variables and mute/unmute fucntions 
let backgroundMusic = new Audio();
let portalEnterSound = new Audio();
let portalExitSound = new Audio();

backgroundMusic.src = "sounds/bg-music.mp3";
portalEnterSound.src = "sounds/warp-entrance.mp3";
portalExitSound.src = "sounds/warp-exit.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 1;
    }
}

function muteBackgroundMusic() {
    const muteBtnImg = document.getElementById("mute-btn-img");
    if (backgroundMusicStatus == 0) {
        muteBtnImg.setAttribute("src", "assets/HEADER/mute.png");
        backgroundMusic.volume = 0;
        backgroundMusicStatus++;
    } else {
        muteBtnImg.setAttribute("src", "assets/HEADER/unmute.png");
        backgroundMusic.volume = 1;
        backgroundMusicStatus--;
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic)
//END HERE


// The following lines of codes are for the start animation (click to start)
document.addEventListener('click', () => {
    const portal = document.getElementById('portal');
    const burst = document.getElementById('portal-burst');

    void burst.offsetWidth;
    
    burst.classList.add('expand');
    portal.classList.add('show');

    setTimeout(() => {
    portalEnterSound.play();
    document.getElementById('start-title').style.opacity = '0';
    document.getElementById('start-header').style.opacity = '0';
    document.getElementById('bottom-ct').style.bottom = '-80px';
    document.getElementById('top-ct').style.top = '-80px';
    }, 0);

    setTimeout(() => {
        portal.classList.add('zoom');
    }, 600);

    setTimeout(() => {
        portalExitSound.play();
        document.getElementById('background-img').style.opacity = '0';
        document.getElementById('bottom-ct').style.bottom = '-480px';
        document.getElementById('top-ct').style.top = '-480px';
        portal.classList.add('shrink');
    }, 1900);

    setTimeout(() => {
        document.getElementById('background-img').style.opacity = '0';
    }, 2600);

    setTimeout(() => {
        hideStartScreen();
        changeDisplay();
        burst.classList.remove('expand');
        portal.classList.remove('show', 'zoom', 'shrink');
    }, 2600);
}, { once: true });
//END HERE



// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board
let startScreenTimer;

function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);
    clearInterval(startScreenTimer);
}
//END HERE

// The following lines of codes hides all the header and gameboard elements, and shows the end message
function endGame(){
    const portal = document.getElementById('portal2');
    
    portal.classList.add('show');

    scoreCounter
    document.getElementById("game-board").style.display = "none"
    document.getElementById("header").style.display = "none"
    clearInterval(backgroundMusicInterval)
    backgroundMusic.volume = 0
    if (scoreCounter >= 7){
        document.getElementById("pass-end-screen").style.display = "flex"

        const scrambled = "RkFURQ==";
        const secretCode = atob(scrambled);

        const secretMessage = document.getElementById("secret-message");
        if (secretMessage) {
            secretMessage.innerHTML = "SECRET MESSAGE: <b>" 
                + secretCode + "</b>.";
        }

    } else {
        document.getElementById("fail-end-screen").style.display = "flex"
    }
}

// FAIL SCREEN PORTAL RESET
document.addEventListener("DOMContentLoaded", () => {
    const resetPortal = document.getElementById("portal-reset");
    if (resetPortal) {
        resetPortal.addEventListener("click", () => {
            location.reload();
        });
    }
});

// END HERE

let questionBank = [
    [
        ["Ordinary, Extraordinarily", true],
        ["Extraordinary, Ordinarily ", false],
        ["Ordinary, Extraordinary ", false],
        "Benilde’s motto is: “Doing __________ things __________ well.”"
    ],
    [
        ["Connection", false],
        ["Collaboration", false],
        ["Communion", true],
        "The mission of De La Salle Philippines promotes the spirit of faith, zeal for service, and __________ in mission."
    ],
    [
        ["Respectful", false],
        ["Inclusive", true],
        ["Accepting", false],
        "The Lasallian value of being __________ means accepting and empowering all people."
    ],
    [
        ["Lasallian Core Values", false],
        ["BenEx", true],
        ["BenCore", false],
        "The Benildean Expression of Core Values is also known as __________."
    ],
    [
        ["Saint Benilde Romançon", true],
        ["Saint Thomas Aquinas", false],
        ["Saint John Baptist de La Salle", false],
        "__________ the patron saint of DLS-CSB."
    ],
    [
        ["My actions", true],
        ["Things", false],
        ["Actions", false],
        "I will continue, O my God, to do all______ for the love of you."
    ],
    [
        ["Successful", false],
        ["Excellent", true],
        ["Respectful", false],
        "Benilde promotes fair treatment and academic honesty under the value of being ______ with integrity."
    ],
    [
        ["Holistic", true],
        ["Spiritual", false],
        ["Emotional", false],
        "The Benildean learning environment promotes academic excellence and ______ development."
    ],
    [
        ["Socially", true],
        ["Fully", false],
        ["Morally", false],
        " ______ responsible Benildeans engage in addressing social issues and helping others."
    ],
    [
        ["Prayer", false],
        ["Vision-Mission of DLS-CSB", false],
        ["Lasallian Prayer", true],
        "The ______ is also anchored in the Lasallian Core Values."
    ]
]

function startGame() {
    hideStartScreen()
}

let scoreCounter = 0
let roundIndex = 0

const choiceButtonA = document.getElementById("choice-a")
const choiceButtonB = document.getElementById("choice-b")
const choiceButtonC = document.getElementById("choice-c")

const promptText = document.getElementById("prompt-text")

const scoreDisplay = document.getElementById("score")

function changeDisplay() {
    choiceButtonA.innerHTML = questionBank[roundIndex][0][0]
    choiceButtonB.innerHTML = questionBank[roundIndex][1][0]
    choiceButtonC.innerHTML = questionBank[roundIndex][2][0]
    promptText.innerHTML = questionBank[roundIndex][3]
    score.innerHTML = "SCORE: " + scoreCounter
}

function selectChoiceA() {
    if (roundIndex <= 8 && questionBank[roundIndex][0][1] == true){
        scoreCounter++
        roundIndex++
        changeDisplay()
    } else if (roundIndex == 9){
        endGame()
    } else {
        roundIndex++
        changeDisplay()
    }
}

function selectChoiceB() {
    if (roundIndex <= 8 && questionBank[roundIndex][1][1] == true){
        scoreCounter++
        roundIndex++
        changeDisplay()
    } else if (roundIndex == 9){
        endGame()
    } else {
        roundIndex++
        changeDisplay()
    }
}

function selectChoiceC() {
    if (roundIndex <= 8 && questionBank[roundIndex][2][1] == true){
        scoreCounter++
        roundIndex++
        changeDisplay()
    } else if (roundIndex == 9){
        endGame()
    } else {
        roundIndex++
        changeDisplay()
    }
}

choiceButtonA.addEventListener("click", selectChoiceA)
choiceButtonB.addEventListener("click", selectChoiceB)
choiceButtonC.addEventListener("click", selectChoiceC)

