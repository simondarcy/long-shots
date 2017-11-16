var GameOver = {

    preload: function () {
        background = game.add.sprite(0, 0, 'background-gradient');
        background.width = w;
        background.height = h;
    },
    create: function () {
        textStyle = {
            font: settings.finalScoreTextFont,
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        scoredescText = game.add.text(game.world.centerX-15, 40, "Final Score ", textStyle);
        scoredescText.anchor.set(0.5);
        textStyle['fill'] = "#FF0000";
        scoreText = game.add.text( (scoredescText.left + scoredescText.width) + 15, 40, score, textStyle);
        scoreText.anchor.set(0.5);

        //Add tap to replay
        instructionHeadingTextStyle = { font: settings.instructionFont , fill: '#ffe600', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.world.centerX, game.world.centerY+100, "Tap to Play Again", instructionHeadingTextStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;
        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);

        instructionHeading.inputEnabled = true;
        instructionHeading.events.onInputDown.add(function(){
            game.state.start('Game');
        }, this);


        //Share panel stuff ( this became a bit tricky )

        //Build and display logo at bottom of screen
        var gs2 = game.add.group();
        var gg2 = game.add.group();
        var shareIcons = game.add.group();

        var logo = game.add.sprite(game.world.centerX, game.stage.height-20, 'rtelogo');
        logo.anchor.setTo(0.5);
        logo.scale.set(0.4, 0.4);

        var facebook = game.add.button(game.world.centerX - 100, game.stage.height-95, 'facebook');
        facebook.anchor.setTo(0.5);

        var twitter = game.add.button(game.world.centerX, game.stage.height-95, 'twitter');
        twitter.anchor.setTo(0.5);
        var link;
        if(settings.isMobile) {
            link = game.add.button(game.world.centerX + 100, game.stage.height - 95, 'whatsapp');
        }
        else{
            link = game.add.button(game.world.centerX + 100, game.stage.height - 95, 'link');
        }
        link.anchor.setTo(0.5);

        facebook.onInputUp.add(function(){
            url = "//www.facebook.com/sharer/sharer.php?u=https://www.rte.ie/long-shots/";
            window.open(url, "_blank")

        }, this);
        twitter.onInputUp.add(function(){
            shareText = "I scored " + score + " headers for @FAIreland playing 'Long Shots' with @shanelong7 Play Now!";
            url = "//twitter.com/share?url=https://www.rte.ie/long-shots/&text="+shareText+"&via=rtesport&hashtags=rtesoccer";
            window.open(url, "_blank")
        }, this);

        link.onInputUp.add(function(){
            shareText = "I scored " + score + " headers playing Long Shots!. Play here: https://www.rte.ie/long-shots/";

            //If mobile open in whatsapp
            if(settings.isMobile){
                url = "whatsapp://send?text=" + shareText;
                window.open(url, "_blank")
            }
            else{
                //If desktop, copy link to clipboard
                var $temp = document.createElement("input");
                document.body.appendChild($temp);
                $temp.value = shareText;
                $temp.focus();
                $temp.select();
                document.execCommand("copy");
                document.body.removeChild($temp);
                alert("Game link copied to clipboard. Thanks for sharing!");
            }

        }, this);

        //Add purple rectangle
        var purpleRect = game.add.graphics(100, 100);
        purpleRect.beginFill(0x260A49);
        purpleRect.drawRect(-100, game.world.centerY + 40 , 1200, 1200);
        purpleRect.endFill();
        //Add both logo and rectangle to stage
        gg2.add(purpleRect);
        gs2.add(logo);
        shareIcons.add(facebook);
        shareIcons.add(twitter);
        shareIcons.add(facebook);
        //make sure logo is above

        game.world.bringToTop(gs2);
        game.world.bringToTop(shareIcons);

        //Only add heading if there is enough vertical space to play with
        if(game.world.height > 600) {
            shareHeadingTextStyle = {
                font: settings.shareHeadingFont,
                fill: '#FFFFFF',
                align: 'center',
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            shareHeading = game.add.text(game.world.centerX, game.world.centerY + settings.shareHeadingTop, "Share", shareHeadingTextStyle);
            shareHeading.anchor.set(0.5);
        }

        //Kill various game sprites
        target.kill();
        player.kill();

        this.saveScore();

        //Handle the end sprite

        var end_sprite;

        //If no top score yet or new top score, do a dance
        if(localStorage.getItem("lsscore") == null || (score >= parseInt( localStorage.getItem("lsscore") ) ) ){
            end_sprite = game.add.sprite(game.world.centerX, game.world.centerY+70, 'dance_sprite');
            var dancing = end_sprite.animations.add('dancing');
            end_sprite.scale.set(settings.endDanceSpriteScale);
            end_sprite.animations.play('dancing', 15, true);
        }
        //Didn't beat top score
        else{
            end_sprite = game.add.sprite(game.world.centerX, game.world.centerY+55, 'angry_sprite');
            var angry = end_sprite.animations.add('angry');
            end_sprite.scale.set(settings.endAngrySpriteScale);
            end_sprite.animations.play('angry', 6, false);

        }

        end_sprite.anchor.set(0.5, 1);
        end_sprite.inputEnabled = true;
        end_sprite.events.onInputDown.add(function(){
            game.state.start('Game');
        }, this);

        //Get top score
        if (typeof(Storage) !== "undefined") {
            top_score = localStorage.getItem("lsscore");
            textStyle['fill'] = "#FFFFFF";
            bestScoredescText = game.add.text(game.world.centerX-15, scoreText.y + 40, "Best Score ", textStyle);
            bestScoredescText.anchor.set(0.5);
            textStyle['fill'] = "#FF0000";
            bestScoreText = game.add.text((bestScoredescText.left + bestScoredescText.width)+15, scoredescText.y + 40, top_score, textStyle);
            bestScoreText.anchor.set(0.5);
        }

        game.input.onTap.add(function () {
            //game.state.start('Game');
        }, this);

    },
    saveScore : function(){

        if (typeof(Storage) !== "undefined") {

            //check if score is set
            if (localStorage.getItem("lsscore") !== null) {

                //check if current score is greater than
                if( score > parseInt( localStorage.getItem("lsscore") ) ){
                    localStorage.setItem("lsscore", score);
                }

            }
            //no score set so set it
            else{
                try {
                    localStorage.setItem("lsscore", score);
                }catch(e){
                    return false;
                }
            }

            console.log(localStorage.getItem("lsscore") );

        }
        else { // No Local Storage
            return false;
        }//end LS check

    }///end saveScore function
};