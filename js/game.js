
var timeLeft = 30;
var audioPlaying = false;

var Game = {

    preload: function() {
        background = game.add.sprite(0, 0, 'background');
        background.width = w;
        background.height = h;
        timeLeft = 30;

    },
    updateScore : function() {
        gameSpeed += 10;
        score++;
        scoreText.setText(score);
        scoreText.alpha = 1;
        scoreTween = game.add.tween(scoreText).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true);
    },
    decreaseTime: function(){
        timeLeft --;
        timeText.text = timeLeft;
        if(timeLeft == 0){
            game.state.start('GameOver');
        }
    },
    addTarget : function() {
        //Randomly add target to screen
        var min = 25;
        var rndX = min + Math.floor(Math.random() * (w - min + 1));
        var rndY = min + Math.floor(Math.random() * (h / 3 - min + 1));

        target = game.add.sprite(rndX, rndY, 'target');
        target.anchor.set(0.5, 0.5);
        target.scale.set(0, 0);

        var targetTween = game.add.tween(target.scale);
        targetTween.to({x: settings.targetScale, y: settings.targetScale}, 200, Phaser.Easing.Linear.None);
        targetTween.onComplete.addOnce(function () {

        }, this);
        targetTween.start();

        //ad physics to to the target
        game.physics.enable(target, Phaser.Physics.ARCADE);

    },

    addBall : function() {
        //Setup ball
        var ball = balls.create(game.world.width * 0.5, 0, 'ball');
        ball.width = settings.ballSize;
        ball.height = settings.ballSize;
        ball.anchor.set(0.5);
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        //ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);
        ball.checkWorldBounds = true;
        ball.inputEnabled = true;
        ball.body.velocity.set(0, gameSpeed);

        balls.setAll('body.collideWorldBounds', true);

        //If ball falls below the screen
        ball.events.onOutOfBounds.add(function (ball) {
            ball.kill();
            if (balls.countLiving() == 0) {
                game.state.start('GameOver');
            }
        }, this);
    },

    addPlayer : function() {
        player = game.add.sprite(game.world.width * 0.5, game.world.height - 55, 'player');
        player.anchor.set(0.5, 1);
        player.scale.set(settings.playerScale, settings.playerScale);
        //make player dragable
        player.inputEnabled = true;
        player.input.enableDrag();
        player.input.allowVerticalDrag = false;
        //ad physics to player
        game.physics.enable(player, Phaser.Physics.ARCADE);
        //Make player only move horizontal
        player.body.immovable = true;
        //keep player in the game
        if (!settings.isMobile) {
            player.body.collideWorldBounds = true;
        }
        player.animations.add('header-left', [1, 0], 8);

    },

    create : function() {

        //Setup physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.checkCollision.down = false;

        cursors = game.input.keyboard.createCursorKeys();

        //audio
        kickAudio = game.add.audio('kick');
        kickAudio.onStop.add(function(){
            audioPlaying =  false;
        }, this);
        bounceAudio = game.add.audio('bounce');
        whistleAudio = game.add.audio('whistle');

        this.addPlayer();

        //add text
        textStyle = {
            font: settings.scoreTextFont,
            fill: '#ff0006',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        scoreText = game.add.text(game.world.centerX, game.world.centerY - 100, score, textStyle);
        scoreText.anchor.set(0.5);
        scoreText.alpha = 0;

        //add time test
        timertextStyle = {
            font: settings.timerTextFont,
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        timedescText = game.add.text(game.world.centerX-20, 25, "Time: ", timertextStyle);
        timedescText.anchor.set(0.5);
        timertextStyle['fill'] = "#FF0000";
        timeText = game.add.text(timedescText.left + timedescText.width + 20, 25, timeLeft, timertextStyle);
        //timeText = game.add.text(game.world.centerX, 25, timeLeft, timertextStyle);
        timeText.anchor.set(0.5);

        game.time.events.loop(Phaser.Timer.SECOND, this.decreaseTime, this);

        //Add ball group
        balls = game.add.physicsGroup(Phaser.Physics.ARCADE);

        addLogo();

        this.startGame();

    },

    update : function() {
        //Balls hitting the target
        game.physics.arcade.collide(balls, target, function (target, ball) {

            ball.body.velocity.x = -1 * 5 * (target.x - ball.x);
            ball.body.velocity.y = -gameSpeed;//-gamespeed to increase etc

            bounceAudio.play();

            var killTween = game.add.tween(target.scale);
            killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
            killTween.onComplete.addOnce(function () {
                target.kill();
            }, this);
            killTween.start();
            Game.addTarget();
            Game.updateScore();

        });

        //Balls hitting the player
        game.physics.arcade.overlap(balls, player, function (player, ball) {
            ball.body.velocity.x = -1 * 5 * (player.x - ball.x);
            ball.body.velocity.y = -gameSpeed;//-gamespeed to increase etc
            ball.body.angularVelocity = -1 * 5 * (player.x - ball.x);
            if(!audioPlaying) {
                kickAudio.play();
                audioPlaying = true;
            }
            player.animations.play('header-left');

        });

        //Key events
        if (cursors.right.isDown) {
            player.frame = 3;
            player.body.velocity.x += 20;
            direction = "right";
        } else if (cursors.left.isDown) {
            player.frame = 0;
            player.body.velocity.x -= 20;
            direction = "left";
        }

    },

    startGame : function() {
        whistleAudio.play();
        game.input.onTap.removeAll();
        scoreText.setText("");
        scoreText.alpha = 0;
        score = 0;
        gameSpeed = 300;
        this.addBall();
        this.addTarget();
    }

};