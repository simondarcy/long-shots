var loadingText;
var Preloader = {

    preload : function() {

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.scale.refresh();

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);

        // Load all the needed resources for the menu.

        //Global Assets
        game.stage.backgroundColor = '#130525';
        game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        if(settings.isMobile) {
            game.load.image('background', 'img/bg-mobile.png');
        }
        else{
            game.load.image('background', 'img/bg-desktop.png');
        }
        game.load.image('rtelogo', './img/logo.png?v=6');

        game.load.image('background-gradient', 'img/bg-gradient.png');

        //Splash Screen Assets
        game.load.spritesheet('splashRoy', './img/shane-long-guide.png', 337, 396, 2);
        game.load.image('splashTarget', './img/target_guide_v2.png?v=6');


        WebFontConfig = {
            active: function() {
                game.time.events.add(Phaser.Timer.SECOND, function() {}, this);
            },
            google: {
                families: ['Fredoka One']
            }
        };

        //Main Game Assets
        game.load.image('ball', 'img/ball.png');
        game.load.image('target', 'img/target_v2.png');
        game.load.spritesheet('player', 'img/shane-long-sprite.png', 190, 404, 2);
        game.load.audio('kick', ['audio/kick.wav']);
        game.load.audio('whistle', ['audio/whistle.wav']);
        game.load.audio('bounce', ['audio/coin.wav']);

        //game over assets
        game.load.spritesheet('dance_sprite', 'img/shane-long-celebrate.png', 330, 520, 7);
        game.load.spritesheet('angry_sprite', 'img/shane-long-angry.png', 330, 430, 4);

        //share icons
        game.load.image('facebook', 'img/share_facebook.png');
        game.load.image('twitter', 'img/share_twitter.png');
        game.load.image('link', 'img/share_link.png');
        game.load.image('whatsapp', 'img/share_whatsapp.png');

        loadingText = game.add.text(32, 100, 'Loading', { fill: '#FFF'});
        game.load.start();

    },
    loadStart : function(){
        loadingText.setText("Loading ...");
    },
    loadComplete : function(){
        game.state.start('Menu');
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadingText.setText("Loading: " + progress + "% - " + totalLoaded + " of " + totalFiles);
    },
    create: function () {

    }
};