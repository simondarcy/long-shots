var mobileSettings = {
    splashHeadingFont:'42px Fredoka One',
    shareHeadingFont:'35px Fredoka One',
    shareHeadingTop: 170,
    scoreTextFont:'40px Fredoka One',
    finalScoreTextFont:'30px Fredoka One',
    timerTextFont:'25px Fredoka One',
    instructionFont:'25px Fredoka One',
    splashPlayerScale:0.7,
    splashTargetScale:0.8,
    playerScale:0.5,
    endDanceSpriteScale:0.6,
    endAngrySpriteScale:0.6,
    ballSize:40,
    targetScale:0.4,
    isMobile:true,
    gameSpeed: 300
};

var desktopSettings = {
    splashHeadingFont:'60px Fredoka One',
    shareHeadingFont:'40px Fredoka One',
    shareHeadingTop: 170,
    scoreTextFont:'60px Fredoka One',
    finalScoreTextFont:'35px Fredoka One',
    timerTextFont:'32px Fredoka One',
    instructionFont:'32px Fredoka One',
    splashPlayerScale:0.7,
    splashTargetScale:0.8,
    playerScale:0.65,
    endDanceSpriteScale:0.6,
    endAngrySpriteScale:0.7,
    ballSize:55,
    targetScale:0.6,
    gameSpeed:350,
    isMobile:false};

var settings = mobileSettings;

var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


if (w > 1160){
    //Switch to desktop settings
    settings = desktopSettings;
}

//max width height

//800 x 450

if(w>1160){
    w = 1160;
    h = 650;
}

gameSpeed = settings.gameSpeed;
score = 0;

var scoreText, balls, player, direction = "left";
