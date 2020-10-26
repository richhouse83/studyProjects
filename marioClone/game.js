const gameState = {
    width: 1184 * 6,
    height: 700,
    brickLength: 32,
    doubleJump: false,
    getRandom(amount){
        return Math.floor(Math.random() * amount);
    },
    active: false,
    marioJumpRate: -550,
    playMusic: false,
    groundLevel: this.height - (this.brickLength * 2),
    coinCount: 0,
    isLarge: false,
    turtleSpeed: 50,
};

const config = {
	type: Phaser.AUTO,
	width: 1200,
    height: 540,
	backgroundColor: "b9eaff",
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 1000 },
            enableBody: true,
            debug: false,

		}
	},
	scene: [GameScene]
};

const game = new Phaser.Game(config);


