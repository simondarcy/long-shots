var game = new Phaser.Game(w, h, Phaser.AUTO, 'game');

var addLogo =  function(){
    //Build and display logo at bottom of screen
    var gs = game.add.group();
    var gg = game.add.group();
    //RTE Sport logo
    var logo = game.add.sprite(game.world.centerX, game.stage.height-20, 'rtelogo');
    logo.anchor.setTo(0.5);
    logo.scale.set(0.4, 0.4);
    //Add purple rectangle
    var graphics = game.add.graphics(100, 100);
    graphics.beginFill(0x260A49);
    graphics.drawRect(-100, game.world.height - 140, 1200, 40);
    graphics.endFill();
    //Add both logo and rectangle to stage
    gg.add(graphics);
    gs.add(logo);
    //make sure logo is above
    game.world.bringToTop(gs);
};

game.state.add('Preloader', Preloader);
game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);

game.state.start('Preloader');
