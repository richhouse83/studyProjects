function preload() {
    this.load.image('bug1', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Bug+Invaders/bug_1.png');
    this.load.image('bug2', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Bug+Invaders/bug_2.png');
    this.load.image('bug3', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Bug+Invaders/bug_3.png');
    this.load.image('platform', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png');
    this.load.image('ship', 'ship.png');
    this.load.image('bugPellet', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Bug+Invaders/bugPellet.png');
    this.load.image('bugRepellent', 'https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/Bug+Invaders/bugRepellent.png');
  }
  
  // Helper Methods below:
  // sortedEnemies() returns an array of enemy sprites sorted by their x coordinate
  function sortedEnemies(){
    const orderedByXCoord = gameState.enemies.getChildren().sort((a, b) => a.x - b.x);
    return orderedByXCoord;
  }
  // numOfTotalEnemies() returns the number of total enemies 
  function numOfTotalEnemies() {
      const totalEnemies = gameState.enemies.getChildren().length;
    return totalEnemies;
  }
  
  const gameState = {
    enemyVelocity: 1,
    repellentCount: 0,
    clipAmount: 3,
    score: 0,
  };
  
  function create() {
      // When gameState.active is true, the game is being played and not over. When gameState.active is false, then it's game over
      gameState.active = true;
  
      // When gameState.active is false, the game will listen for a pointerup event and restart when the event happens
      this.input.on('pointerup', () => {
          if (gameState.active === false) {
              gameState.repellentCount = 0;
              this.scene.restart();
          }
      })
  
      // Creating static platforms
      const platforms = this.physics.add.staticGroup();
      platforms.create(225, 490, 'platform').setScale(1, .3).refreshBody();
      platforms.create(225,-10, 'platform').setScale(1, .3).refreshBody();
  
      // Displays the initial number of bugs, this value is initially hardcoded as 24 
      gameState.countText = this.add.text(175, 482, 'Bugs Left: 24', { fontSize: '15px', fill: '#000000' });
      gameState.ammoText = this.add.text(10, 482, `Ammo: ${gameState.clipAmount - gameState.repellentCount}`, { fontSize: '15px', fill: '#000000' });
      gameState.scoreText = this.add.text(340, 482, `Score: ${gameState.score}`, { fontSize: '15px', fill: '#000000' });
  
      // Uses the physics plugin to create Player
      gameState.player = this.physics.add.sprite(225, 450, 'ship').setScale(.1);
  
      // Create Collider objects
      gameState.player.setCollideWorldBounds(true);
      this.physics.add.collider(gameState.player, platforms);
      
      // Creates cursor objects to be used in update()
      gameState.cursors = this.input.keyboard.createCursorKeys();
  
      // Add new code below:
      gameState.enemies = this.physics.add.group();
      const bugArray = ['bug1', 'bug2', 'bug3']
    for(let yVal = 1; yVal < 4; yVal++){
      for(let xVal = 1; xVal < 9; xVal++){
        let bug = '';
        if (yVal == 1){
          bug = 'bug1'
        } else if (yVal == 2){
          bug = 'bug2'
        } else bug = 'bug3'
        gameState.enemies.create(50 * xVal, 50 * yVal, bug).setScale(.6).setGravityY(-200);
      }
    }
    const pellets = this.physics.add.group();
    function genPellet(){
      const randomBug = Phaser.Utils.Array.GetRandom(gameState.enemies.getChildren());
      pellets.create(randomBug.x, randomBug.y, 'bugPellet');
    }
    gameState.pelletsLoop = this.time.addEvent({
      delay: 300,
    callback: genPellet,
    callbackScope: this,
    loop: true,
    });
    this.physics.add.collider(pellets, platforms, (pellet)=>{
      pellet.destroy();
    })
    this.physics.add.collider(pellets, gameState.player, ()=>{
      gameState.active = false;
      gameState.enemyVelocity = 1;
      gameState.pelletsLoop.destroy();
      this.physics.pause();
      this.add.text(150, 225, 'Game Over', {fontsize: '15px', fill: '#000000'})
    })
    this.physics.add.collider(gameState.enemies, gameState.player, ()=>{
        gameState.active = false;
        gameState.enemyVelocity = 1;
        this.physics.pause();
        this.add.text(150, 225, "Got eaten didn't you?", {fontsize: '15px', fill: '#000000'})
      })
    gameState.bugRepellent = this.physics.add.group();
    this.physics.add.collider(gameState.enemies, gameState.bugRepellent, function(bug, repellent){
      const bugName = bug.texture.key;
      //console.log(bugName)
      if (bugName == 'bug1'){
        gameState.score  += 300;
      } else if (bugName == 'bug2'){
        gameState.score += 200;
      } else  gameState.score += 100;
      bug.destroy();
      repellent.destroy();
      gameState.repellentCount -= 1;
      gameState.enemyVelocity = gameState.enemyVelocity * 1.02;
      gameState.countText.setText(`Bugs Left: ${numOfTotalEnemies()}`);
      gameState.ammoText.setText(`Ammo: ${gameState.clipAmount - gameState.repellentCount}`);
      gameState.scoreText.setText(`Score: ${gameState.score}`)
    });
    this.physics.add.collider(gameState.bugRepellent, platforms, function(repellent){
      repellent.destroy();
      gameState.repellentCount -= 1;
      gameState.ammoText.setText(`Ammo: ${gameState.clipAmount - gameState.repellentCount}`);
    });
  }
  
  function update() {
      if (gameState.active) {
          // If the game is active, then players can control Codey
          if (gameState.cursors.left.isDown) {
              gameState.player.setVelocityX(-160);
          } else if (gameState.cursors.right.isDown) {
              gameState.player.setVelocityX(160);
          } else {
              gameState.player.setVelocityX(0);
          }
  
          // Execute code if the spacebar key is pressed
          if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) {
              if(gameState.repellentCount < gameState.clipAmount){
                gameState.repellentCount += 1;
                gameState.bugRepellent.create(gameState.player.x , gameState.player.y-14, 'bugRepellent').setGravityY(-200).setVelocityY(-200);
                gameState.ammoText.setText(`Ammo: ${gameState.clipAmount - gameState.repellentCount}`);
              }
          }
  
          // Add logic for winning condition and enemy movements below:
      if (numOfTotalEnemies() === 0){
        gameState.active = false;
        this.physics.pause();
        this.add.text(125, 225, "You WON!");
        gameState.enemyVelocity = 1;
      } else {
        gameState.enemies.getChildren().forEach(bug=>{
          bug.x += gameState.enemyVelocity;
        })
        gameState.leftMostBug = sortedEnemies()[0];
        gameState.rightMostBug = sortedEnemies()[sortedEnemies().length - 1];
        if(gameState.rightMostBug.x > 440 || gameState.leftMostBug.x < 10 ){
          gameState.enemyVelocity = gameState.enemyVelocity * -1;
          gameState.enemies.getChildren().forEach(bug=>{
            bug.y += 10;
          })
        }
      }
      
    }
  }
  
  const config = {
      type: Phaser.AUTO,
      width: 450,
      height: 500,
      backgroundColor: "b9eaff",
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 200 },
              enableBody: true,
          }
      },
      scene: {
          preload,
          create,
          update
      }
  };
  
  
  const game = new Phaser.Game(config);