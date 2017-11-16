var Menu = {

    preload : function() {

    },

create: function () {

        //add background
        background = game.add.sprite(0, 0, 'background');
        background.width = w;
        background.height = h;

        //Add Roy to splash screen
        splashRoyTop =  (game.stage.height/1.5);
        if(!settings.isMobile) {
            splashRoyTop = game.world.centerY + 90
        }
        splashRoy = game.add.sprite(game.world.centerX, splashRoyTop, 'splashRoy');
        splashRoy.anchor.setTo(0.5);
        splashRoy.scale.set(settings.splashPlayerScale);

        var splashDance = splashRoy.animations.add('splashDance');
        splashRoy.animations.play('splashDance', 5, true);

        //Add splash screen target
        splashTargetLeft =  game.stage.width/2;
        if(!settings.isMobile) {
            splashTargetLeft = game.stage.width / 2 + 10;
        }

        splashTarget = game.add.sprite(splashTargetLeft, 75, 'splashTarget');
        splashTarget.anchor.setTo(0.5);
        splashTarget.scale.set(settings.splashTargetScale);

        //add Splash screen heading
        textStyle = { font: settings.splashHeadingFont , fill: '#ffffff', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        splashHeading = game.add.text(game.world.centerX, splashTarget.centerY+85, "Long Shots", textStyle);
        splashHeading.scale.set(0);
        splashHeading.anchor.set(0.5);

        var splashHeadingTween = game.add.tween(splashHeading.scale);
        splashHeadingTween.to({x:1,y:1}, 300, Phaser.Easing.Linear.None);
        splashHeadingTween.onComplete.addOnce(function () {

            textStyle = { font: settings.instructionFont , fill: '#ffe600', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
            instructionHeading = game.add.text(game.world.centerX, splashHeading.centerY+55, "Tap to Play", textStyle);
            instructionHeading.anchor.set(0.5);
            instructionHeading.alpha = 0;

            instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);


        }, this);
        splashHeadingTween.start();


        addLogo();




    game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);


    }
};