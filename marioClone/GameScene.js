class GameScene extends Phaser.Scene {
    constructor(){
        super({key: 'GameScene'})
    }

    preload(){
        // images
        this.load.image('brick', './images/brick.png')
        this.load.image('ground', './images/ground.png')
        this.load.image('qblock', './images/qblock.png')
        this.load.image('block', './images/block.png')
        this.load.image('largeHill', './images/largeHill.png')
        this.load.image('cloud1', './images/cloud1.png')
        this.load.image('cloud2', './images/cloud2.png')
        this.load.image('flagpole', './images/flagpole.png')
        this.load.image('coin', './images/coin.png')
        this.load.image('mushroom', './images/mushroom.png')
        //sprites
        this.load.spritesheet('mario', './images/MarioRunSprite.png',{ frameWidth: 136, frameHeight: 128 })
        this.load.spritesheet('goomba', './images/enemies2.png', {frameWidth: 16, frameHeight:16})
        this.load.spritesheet('coinani', './images/coinAni.png', {frameWidth: 20, frameHeight: 28})
        this.load.spritesheet('qblockani', './images/qblockAni.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('largeMario', './images/marioLarge.png', {frameWidth: 136, frameHeight: 256})
        this.load.spritesheet('turtle', './images/turtle.png',{frameWidth:38, frameHeight: 48})
        //sounds
        this.load.audio('jumpSound', './sounds/smb_jump-small.wav')
        this.load.audio('stomp', './sounds/smb_stomp.wav')
        this.load.audio('breakBlock', './sounds/smb_breakblock.wav')
        this.load.audio('theme', './sounds/SuperMarioBros.mp3')
        this.load.audio('died', './sounds/smb_mariodie.wav')
        this.load.audio('coin', './sounds/smb_coin.wav')
        this.load.audio('bump', './sounds/smb_bump.wav')
        this.load.audio('powerup', './sounds/smb_powerup.wav')
        this.load.audio('powerdown', './sounds/smb_pipe.wav')
        
    }

    create(){
        //create sounds
        gameState.jumpSound = this.sound.add('jumpSound');
        gameState.stomp = this.sound.add('stomp');
        gameState.breakBlock = this.sound.add('breakBlock');
        gameState.theme = this.sound.add('theme');
        gameState.deadTheme = this.sound.add('died');
        gameState.coinSound = this.sound.add('coin');
        gameState.bump = this.sound.add('bump');
        gameState.powerup = this.sound.add('powerup');
        gameState.powerDown =  this.sound.add('powerdown');

        // animations
        this.anims.create({key: 'run',
        frames: this.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
            key: 'idle',
        frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        })
        this.anims.create({
            key:'jump',
            frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 6 }),
        frameRate: 10,
        repeat: 1
        })
        this.anims.create({
            key:'death',
            frames: this.anims.generateFrameNumbers('mario', { start: 6, end: 6 }),
        frameRate: 10,
        repeat: -1

        })

        //large mario anims
        this.anims.create({key: 'largeRun',
        frames: this.anims.generateFrameNumbers('largeMario', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
        });
        this.anims.create({
            key: 'largeIdle',
        frames: this.anims.generateFrameNumbers('largeMario', { start: 0, end: 0 }),
        frameRate: 10,
        repeat: -1
        })
        this.anims.create({
            key:'largeJump',
            frames: this.anims.generateFrameNumbers('largeMario', { start: 5, end: 6 }),
        frameRate: 10,
        repeat: -1
        })


        //goomba anims
        this.anims.create({
            key:'walk',
            frames: this.anims.generateFrameNumbers('goomba', {start: 50, end: 51}),
            frameRate: 5,
            repeat: -1,
        })
        this.anims.create(
            {key:'dead',
        frames: this.anims.generateFrameNumbers('goomba', {start: 52, end: 52}),
        frameRate: 5,
        repeat: -1,
        })

        //turtle anims
        this.anims.create({
            key:'crawl',
            frames: this.anims.generateFrameNumbers('turtle', {start: 0, end: 1}),
            frameRate: 5,
            repeat: -1,
        })
        this.anims.create(
            {key:'shell',
        frames: this.anims.generateFrameNumbers('turtle', {start: 2, end: 2}),
        frameRate: 5,
        repeat: -1,
        })

        // blocks and coin animations
        this.anims.create({
            key:'coinLoop',
            frames: this.anims.generateFrameNumbers('coinani', {start: 0, end: 2}),
            frameRate: 5,
            repeat: 1,
            yoyo: true,
        })
        this.anims.create({
            key:'blockLoop',
            frames: this.anims.generateFrameNumbers('qblockani', {start: 0, end: 2}),
            frameRate: 5,
            repeat: 1,
            yoyo: true,
        })


        // main camera setup
        this.cameras.main.setBounds(0,0, gameState.width, gameState.height);


        const endzoneStart = gameState.width - 20 * gameState.brickLength;
        
        //procedural generation - background
        //Hills
        for (let i = 0; i < gameState.width; i += gameState.brickLength){
            if(gameState.getRandom(10) === 1){
                //console.log('hill')
                this.add.image(i, gameState.height / 4, this.getCloud());
                i += 96;
            } else if (gameState.getRandom(20) === 1){
                this.add.image(i, gameState.height / 2 - 34, this.getCloud());
                i += 96; 
            } else if (gameState.getRandom(20) === 1){
                this.add.image(i, gameState.height / 2 - 70, this.getCloud());
                i += 96; 
            } else if (gameState.getRandom(20) === 1){
                this.add.image(i, gameState.height / 2 + 38, this.getCloud());
                i += 96; 
            }
        }

        //clouds
        for (let i = 0; i < gameState.width; i += gameState.brickLength){
            if(gameState.getRandom(20) === 1){
                this.add.image(i, gameState.height - 35, 'largeHill');
                i += 160;
            }
        }
        // procedural generation -- blocks
        this.platforms = this.physics.add.staticGroup();
        this.qblocks = this.physics.add.staticGroup();
        this.coins = this.physics.add.group({allowGravity: false});
        //this.coins.
        // highest blocks
        for (let i = 0; i < endzoneStart; i += gameState.brickLength){
            if(gameState.getRandom(5) === 1 && i > gameState.brickLength * 4){
                for (let k = i; k <= i + (4 * gameState.brickLength); k += gameState.brickLength){
                    if(gameState.getRandom(5) < 1){
                        this.qblocks.create(k , gameState.height / 2 + (6 * gameState.brickLength), 'qblockani');
                        if(gameState.getRandom(3) < 1){
                            this.coins.create(k, gameState.height / 2 + (5 * gameState.brickLength) - 4, 'coinani', 2);
                        }
                    } else {
                        this.platforms.create(k , gameState.height / 2 + (6 * gameState.brickLength), 'brick');
                        if(gameState.getRandom(3) < 1){
                            this.coins.create(k, gameState.height / 2 + (5 * gameState.brickLength) - 4, 'coinani', 2);
                        }
                    }
                if(gameState.getRandom(3) < 3){
                    this.platforms.create(k, gameState.height - gameState.brickLength, 'ground');
                    this.platforms.create(k, gameState.height, 'ground');
                    if(gameState.getRandom(3) < 1){
                        this.coins.create(k, gameState.height - (2 * gameState.brickLength) - 4, 'coinani', 2);
                    }
                } else k += gameState.brickLength;
            }
            i += 3 * gameState.brickLength
            }
            //bricks at second highest
            if(gameState.getRandom(9) === 1 && i > gameState.brickLength * 4){
                for (let k = i; k <= i + (4 * gameState.brickLength); k += gameState.brickLength){
                    if(gameState.getRandom(5) < 1){
                        this.qblocks.create(k , gameState.height / 2 + (2 * gameState.brickLength), 'qblockani');
                        if(gameState.getRandom(3) < 1){
                            this.coins.create(k, gameState.height / 2 + (1 * gameState.brickLength) - 4, 'coinani', 2);
                        }
                    } else {
                        this.platforms.create(k , gameState.height / 2 + (2 * gameState.brickLength), 'brick');
                        if(gameState.getRandom(3) < 1){
                            this.coins.create(k, gameState.height / 2 + (1 * gameState.brickLength) - 4, 'coinani', 2);
                        }
                    }
                if(gameState.getRandom(5) < 3){
                    this.platforms.create(k, gameState.height - gameState.brickLength, 'ground');
                    this.platforms.create(k, gameState.height, 'ground');
                    if(gameState.getRandom(3) < 1){
                        this.coins.create(k, gameState.height - (2 *gameState.brickLength) - 4, 'coinani', 2);
                    }
                } else k += gameState.brickLength;
            }
            i += 3 * gameState.brickLength
            }
            //bricks at highest
            if(gameState.getRandom(9) === 1 && i > gameState.brickLength * 4){
                for (let k = i; k <= i + (4 * gameState.brickLength); k += gameState.brickLength){
                    if(gameState.getRandom(5) < 1){
                        this.qblocks.create(k , gameState.height / 2 + (gameState.brickLength), 'qblockani');
                        if(gameState.getRandom(3) < 1){
                            this.coins.create(k, gameState.height / 2  - 4, 'coinani', 2);
                        }
                    } else {
                        this.platforms.create(k , gameState.height / 2 + (gameState.brickLength), 'brick');
                        if(gameState.getRandom(3) < 1){
                            this.coins.create(k, gameState.height / 2  - 4, 'coinani', 2);
                        }
                    }
                if(gameState.getRandom(5) < 3){
                    this.platforms.create(k, gameState.height - gameState.brickLength, 'ground');
                    this.platforms.create(k, gameState.height, 'ground');
                    if(gameState.getRandom(3) < 1){
                        this.coins.create(k, gameState.height - (2 * gameState.brickLength) - 4, 'coinani', 2);
                    }
                } else k += gameState.brickLength;
            }
            i += 3 * gameState.brickLength
            }
            if (gameState.getRandom(3) <= 1 || i < gameState.brickLength * 4){
                for (let j = i; j <= i + (3 * gameState.brickLength); j += gameState.brickLength){
                    if(gameState.getRandom(10) === 1){
                        if(gameState.getRandom(5) === 1){
                            this.platforms.create(j, gameState.height - (gameState.brickLength * 3), 'ground')
                        }
                        this.platforms.create(j, gameState.height - (gameState.brickLength * 2), 'ground')
                    }
                    this.platforms.create(j, gameState.height - gameState.brickLength, 'ground');
                    this.platforms.create(j, gameState.height, 'ground');
                }
    
            
            } else i += (3 * gameState.brickLength);
            
        }
        /// endzone
        for (let i = endzoneStart; i <= gameState.width; i += gameState.brickLength){
            if (i === gameState.width - (5 * gameState.brickLength)){
                gameState.goal = this.physics.add.sprite(i, gameState.height - (gameState.brickLength * 2)-134, 'flagpole');
                this.physics.add.collider(gameState.goal, this.platforms);
            }
            this.platforms.create(i, gameState.height - gameState.brickLength, 'ground');
            this.platforms.create(i, gameState.height, 'ground');
        }
        
        // Mario animation and physics
        
        gameState.mario =this.physics.add.sprite(10, gameState.height - 175, 'mario');
        if (gameState.isLarge){
            gameState.mario.body.height = 78
            gameState.mario.setSizeToFrame();
        }
        gameState.mario.setOrigin(0,0);
        gameState.mario.setScale(.3)

        // coin count
        gameState.coinIcon = this.add.sprite(20, 200, 'coin')
        gameState.coinCountText = this.add.text(45, 195, `x ${gameState.coinCount}`)
        gameState.coinIcon.scrollFactorX = 0
        gameState.coinCountText.scrollFactorX = 0
        

        

        //collider for mario and blocks
        gameState.qblockCollider = this.physics.add.collider(gameState.mario, this.qblocks, (mario, block)=>{
            if(mario.body.touching.up && gameState.active){
                block.y -= 10;
                block.body.y -=10;
                if(gameState.getRandom(5) === 1){
                    this.createMushroom(block.x, block.y);
                    
                } else {
                    gameState.blockHit = true;
                    this.coins.create(block.x, block.y - 4, 'coinani', 2);
                }
                const changeblockTimer = setInterval(()=>{
                    block.y +=10;
                    block.destroy()
                    this.platforms.create(block.x, block.y, 'block');
                    clearInterval(changeblockTimer);
                },50)
        }
        })

        gameState.marioCollider = this.physics.add.collider(gameState.mario, this.platforms, (mario, block)=>{
            if(mario.body.touching.up && gameState.active && block.texture.key !== 'ground'){
                block.y -= 10
                block.body.y -= 10;
                //console.log(block)
                if(gameState.getRandom(10) === 1){
                    gameState.blockHit = true;
                    this.coins.create(block.x, block.y - 4, 'coinani', 2);
                }
                const blockTimer = setInterval(()=>{
                    block.y += 10;
                    block.body.y += 10;
                    clearInterval(blockTimer)
                }, 50)
                if(block.texture.key === 'brick') {
                    if(gameState.isLarge){
                        const destroyblocktimer = setInterval(()=>{
                            gameState.breakBlock.play();
                            block.destroy()
                            clearInterval(destroyblocktimer);
                        }, 50)
                    } else {
                        gameState.bump.play()
                    }                    
                } else {
                    gameState.bump.play()
                }
                
            }
        });
        gameState.mario.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, gameState.width, gameState.height + gameState.mario.height + 10);
        this.cameras.main.startFollow(gameState.mario, true, 0.5, 0.5, -300);


        //overlap for coins
        gameState.coinCollect = this.physics.add.overlap(gameState.mario, this.coins, (mario, coin)=>{
            //console.log("coin");
            coin.destroy();
            gameState.coinCount++;
            gameState.coinSound.play();
            gameState.coinCountText.setText(`x ${gameState.coinCount}`)
        })
        // destroy coins generated inside blocks
        const coinOverlap = this.physics.add.overlap(this.coins, this.platforms, (coin)=>{
            coin.destroy();
        })
        coinOverlap.destroy();

        const blockOverlap = this.physics.add.overlap(this.platforms, this.platforms, (block)=>{
            if(block.texture.key === 'brick'){
                block.destroy();
            }
        })
        blockOverlap.destroy();

        //coins hit by blocks
        
        this.coinCollider = this.physics.add.collider(this.coins, this.platforms, (coin)=>{
            if (gameState.active && (gameState.mario.body.touching.up || gameState.blockHit)){
                coin.body.checkCollision.none = true;
                coin.setVelocityY(-900);
                gameState.coinCount++
                gameState.coinCountText.setText(`x ${gameState.coinCount}`)
                const coinGravity = setInterval(()=>{
                    coin.setVelocityY(0);
                    coin.body.allowGravity = true;
                    clearInterval(coinGravity);
                    gameState.coinSound.play();
                    gameState.blockHit = false;
                }, 80);
            }
            const coinup = setInterval(()=>{
                coin.destroy()
                clearInterval(coinup);
            }, 300);
            
        })
        this.coinCollider = this.physics.add.collider(this.coins, this.qblocks, (coin)=>{
            if (gameState.active && (gameState.mario.body.touching.up || gameState.blockHit)){
                coin.body.checkCollision.none = true;
                coin.setVelocityY(-900);
                gameState.coinCount++
                gameState.coinCountText.setText(`x ${gameState.coinCount}`)
                const coinGravity = setInterval(()=>{
                    coin.setVelocityY(0);
                    coin.body.allowGravity = true;
                    clearInterval(coinGravity);
                    gameState.coinSound.play();
                    gameState.blockHit = false;
                }, 80);
            }
            const coinup = setInterval(()=>{
                coin.destroy()
                clearInterval(coinup);
            }, 300);
            
        })
        

        gameState.endLevel = this.physics.add.collider(gameState.mario, gameState.goal, (mario)=>{
            this.scene.restart();
        })
        


        gameState.cursors = this.input.keyboard.createCursorKeys();
        if(gameState.playMusic){
            gameState.theme.play();
        }
        gameState.cointCount = 0;
        gameState.active = true;
        //this.createTurtle();
        console.log(this.physics.world);

    }

    update(){
        this.coins.playAnimation('coinLoop', true);
        this.qblocks.playAnimation('blockLoop', true);

        if(!gameState.isLarge){
            gameState.mario.body.offset.x = 14;
            gameState.mario.body.width = 30
            gameState.mario.body.height = 38.4;
        } else {
            gameState.mario.body.setOffset(0);
            gameState.mario.body.width = 40.4
            gameState.mario.body.height = 78;
        }

        if(gameState.mario.y >= gameState.height){
            if(gameState.active){
                gameState.deadTheme.play();
            }
            gameState.active = false;
        }
        if(!gameState.active){
            this.endRun();

            
        } else {            
            if(gameState.cursors.right.isDown && gameState.active){
                gameState.mario.setVelocityX(350);
                if(gameState.isLarge){
                    gameState.mario.anims.play('largeRun', true)
                } else {
                    gameState.mario.anims.play('run', true);
                }
                gameState.mario.flipX = false;

            
            } else if(gameState.cursors.left.isDown && gameState.active){
                gameState.mario.setVelocityX(-350);
                if(gameState.isLarge){
                    gameState.mario.anims.play('largeRun', true)
                } else {
                    gameState.mario.anims.play('run', true);
                }
                gameState.mario.flipX = true;

            } else {
                gameState.mario.setVelocityX(0);
                if(gameState.isLarge){
                    gameState.mario.anims.play('largeIdle', true)
                } else {
                    gameState.mario.anims.play('idle', true);
                }
            }
            if(gameState.cursors.up.isDown && (gameState.mario.body.touching.down) && gameState.active){
                gameState.mario.setVelocityY(gameState.marioJumpRate);
                if(gameState.isLarge){
                    gameState.mario.anims.play('largeJump', true)
                } else {
                    gameState.mario.anims.play('jump', true);
                }
                gameState.jumpSound.play();
                
            }
            if (!gameState.mario.body.touching.down && gameState.active){
                if(gameState.isLarge){
                    gameState.mario.anims.play('largeJump', true)
                } else {
                    gameState.mario.anims.play('jump', true);
                }
            }
            if (gameState.getRandom(150)=== 1 && gameState.active){
                this.createEnemy();
            }
        }
        
    }
    createEnemy(){
            const randomNo = gameState.getRandom(4)
            if(randomNo === 1){ 
                this.createTurtle();
            } else this.createGoomba();
    }
    endRun(){
        gameState.mario.anims.play('death', true)
            this.physics.pause()
            this.anims.pauseAll()
            gameState.theme.stop();
            gameState.mario.setBounce(1);
            let pauseTimer = setInterval(()=>{
                this.physics.resume();
                this.anims.resumeAll();
                gameState.mario.setBounce(0);
                if(gameState.cursors.space.isDown && !gameState.active){
                    gameState.active = true;
                    gameState.coinCount = 0;
                    this.scene.restart()
                    this.anims.resumeAll()
                    gameState.deadTheme.stop();
                    gameState.mario.body.enable = true;
                    gameState.deadTheme.stop();
                    gameState.isLarge = false;
                    gameState.mario.body.height = 38.4
                }
                clearInterval(pauseTimer);
            }, 600)
            
            
            gameState.marioCollider.overlapOnly = true;
            this.cameras.main.stopFollow()
    }
    getCloud(){
        if (gameState.getRandom(2) === 1){
            return 'cloud1';
        } else return 'cloud2';
    }
    createMushroom(blockX, blockY){
        gameState.mushroom = this.physics.add.sprite(blockX, blockY - 32, 'mushroom');
        gameState.mushroom.setVelocityX(150)
        this.physics.add.collider(gameState.mushroom, this.qblocks);
        this.physics.add.collider(gameState.mushroom, this.platforms, (mushroom)=>{
            if(mushroom.body.touching.right){
                mushroom.setVelocityX(-150)
            } else if (mushroom.body.touching.left){
                mushroom.setVelocityX(150);
            }
        });
        this.physics.add.overlap(gameState.mario, gameState.mushroom, (mario, mushroom)=>{
            if(!gameState.isLarge){
                this.marioGrow();
                //console.log(mario);
                
            }
            mushroom.destroy();
            
        })
        if(gameState.mushroom.y > gameState.height || gameState.mushroom.x < 0 || gameState.mushroom.x > gameState.width){
            gameState.mushroom.destroy();
        }
        
    }
    marioGrow(){
        gameState.powerup.play();
        gameState.mario.y -= 38.4
        gameState.mario.body.height = 78
        this.physics.pause();
        this.anims.pauseAll();
        gameState.mario.setScale(.32);
        const growTimer1 = setInterval(()=>{
            gameState.mario.setScale(.34)
            clearInterval(growTimer1);
        }, 150)
        const growTimer2 = setInterval(()=>{
            gameState.mario.setScale(.3)
            clearInterval(growTimer2);
        }, 300)
        const growTimer3 = setInterval(()=>{
            gameState.mario.setScale(.34)
            clearInterval(growTimer3);
        }, 450)
        const growTimer4 = setInterval(()=>{
            gameState.mario.setScale(.36)
            clearInterval(growTimer4);
        }, 600)
        const growTimer = setInterval(()=>{
            this.physics.resume();
            clearInterval(growTimer)
            gameState.mario.setScale(.3);
            this.anims.resumeAll();
            gameState.isLarge = true
        }, 650)
        gameState.mario.setSizeToFrame()
    }
    marioShrink(){
        //gameState.mario.y -= 38.4
        gameState.powerDown.play()
        gameState.mario.body.height = 40.4
        this.physics.pause();
        this.anims.pauseAll();
        gameState.mario.setScale(.29);
        const shrinkTimer1 = setInterval(()=>{
                gameState.mario.setScale(.28)
                clearInterval(shrinkTimer1);
        }, 150)
        const shrinkTimer2 = setInterval(()=>{
            gameState.mario.setScale(.26)
            clearInterval(shrinkTimer2);
        }, 300)
        const shrinkTimer3 = setInterval(()=>{
            gameState.mario.setScale(.29)
            clearInterval(shrinkTimer3);
        }, 450)
            const shrinkTimer4 = setInterval(()=>{
                gameState.mario.setScale(.27)
                clearInterval(shrinkTimer4);
                }, 600)
        const shrinkTimer = setInterval(()=>{
            this.physics.resume();
            clearInterval(shrinkTimer)
            gameState.mario.setScale(.3);
            this.anims.resumeAll();
            gameState.isLarge = false;
        }, 650)
        gameState.mario.setSizeToFrame()
    }
    createGoomba(){
        gameState.goomba = this.physics.add.sprite(Math.floor(this.cameras.main.worldView.right) + (10 * gameState.brickLength), gameState.height / 2, 'goomba');
                
        gameState.goomba.setScale(2)
        gameState.goomba.anims.play('walk', true);
        gameState.goomba.setVelocityX(-100);
        this.physics.add.collider(gameState.goomba, this.platforms, (goomba, block)=> {
                if(goomba.body.touching.right){ 
                    goomba.setVelocityX(-100)
                } else if (goomba.body.touching.left){
                    goomba.setVelocityX(100);
                }
            });
        this.physics.add.overlap(gameState.goomba, gameState.mario, (goomba, mario)=>{
            if(goomba.body.touching.up && gameState.active){
                mario.setVelocityY(gameState.marioJumpRate)
                goomba.anims.play('dead', true);
                goomba.setVelocityX(0);
                gameState.stomp.play();
                goomba.dead = true;
                setInterval(()=>{
                    goomba.destroy();
                }, 1000);
            } else if (!goomba.dead && gameState.active) {
                if(gameState.isLarge){
                    this.marioShrink()
                } else{
                    gameState.deadTheme.play();
                    gameState.active = false; 
                }
                
            }
        })
        if(gameState.goomba.y > gameState.height || gameState.goomba.x < 0 || gameState.goomba.x > gameState.width){
            gameState.goomba.destroy();
        }
    }
    createTurtle(){
        gameState.turtle = this.physics.add.sprite(Math.floor(this.cameras.main.worldView.right) + (10 * gameState.brickLength), gameState.height / 2, 'turtle');      
        gameState.turtle.anims.play('crawl', true);
        gameState.turtle.setVelocityX(-50);

        this.physics.add.collider(gameState.turtle, this.platforms, (turtle, block)=>{        
            if(turtle.body.touching.right && !turtle.shell){
                turtle.setVelocityX(-50);
                turtle.flipX = false;      
            } else if(turtle.body.touching.left && !turtle.shell){
                turtle.setVelocityX(50);     
                turtle.flipX = true;
            } else if(turtle.body.touching.right && turtle.shell){
                turtle.setVelocityX(-400);     
                turtle.flipX = true;
                gameState.breakBlock.play()
                block.destroy()
            } else if(turtle.body.touching.left && turtle.shell){
                turtle.setVelocityX(400);     
                turtle.flipX = true;
                gameState.breakBlock.play()
                block.destroy()
            }

        })

        this.physics.add.collider(gameState.turtle, this.qblocks, (turtle, block)=>{        
            if(turtle.body.touching.right && !turtle.shell){
                turtle.setVelocityX(-50);
                turtle.flipX = false;      
            } else if(turtle.body.touching.left && !turtle.shell){
                turtle.setVelocityX(50);     
                turtle.flipX = true;
            } else if(turtle.body.touching.right && turtle.shell){
                turtle.setVelocityX(-400);     
                turtle.flipX = true;
                
            } else if(turtle.body.touching.left && turtle.shell){
                turtle.setVelocityX(400);     
                turtle.flipX = true;
            }

        })
        this.physics.overlap(gameState.turtle, gameState.goomba, (turtle, goomba)=>{
            if(turtle.shell){
                goomba.anims.play('dead', true);
                goomba.setVelocityX(0);
                gameState.stomp.play();
                goomba.dead = true;
                setInterval(()=>{
                    goomba.destroy();
                }, 1000);
            }
        })
        

        this.physics.add.overlap(gameState.turtle, gameState.mario, (turtle, mario)=>{
            if(turtle.body.touching.up && gameState.active && !turtle.shell){
                mario.setVelocityY(gameState.marioJumpRate)
                gameState.jumpSound.play()

                turtle.anims.play('shell', true);
                turtle.setVelocityX(0)
                const turtleTimer = setInterval(()=>{
                    turtle.shell = true;
                    clearInterval(turtleTimer)
                }, 500);
                
            } else if (turtle.body.touching.up && gameState.active && turtle.shell){
                gameState.jumpSound.play()
                mario.setVelocityY(gameState.marioJumpRate)
                turtle.setVelocityX(400);
            } else if (gameState.active) {
                if(gameState.isLarge){
                    this.marioShrink()
                } else{
                    gameState.deadTheme.play();
                    gameState.active = false; 
                }
            }
        })

        
        if(gameState.turtle.y > gameState.height || gameState.turtle.x < 0 || gameState.turtle.x > gameState.width){
            gameState.turtle.destroy();
        }
    }

}

