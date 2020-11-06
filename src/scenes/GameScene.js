const playerSpeed = 300;
const dashCooldown = 1.5 * 1000;

let background;
let player;
let shadow;
let playerFace;
let camera;

//time
let time = new Date();
let lastDash = new Date().getTime();

let dashInterval;

//keyboard
let keyW;
let keyS;
let keyA;
let keyD;
let keySpacebar;

let keyL;

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg', './images/debug-grid-1920x1920.png');
        this.load.spritesheet('player_up', './images/spr_player_up_strip6.png', {frameWidth:14, frameHeight:21 });
        this.load.spritesheet('player_down', './images/spr_player_down_strip6.png', {frameWidth:14, frameHeight:21 });
        this.load.spritesheet('player_left', './images/spr_player_left_strip6.png', {frameWidth:14, frameHeight:21 });
        this.load.spritesheet('player_right', './images/spr_player_right_strip6.png', {frameWidth:14, frameHeight:21 });
        this.load.spritesheet('player_shadow', './images/spr_player_shadow_strip6.png', {frameWidth:14, frameHeight:21 });
    }

    create() {
        //#region map
        background = this.add.tileSprite(0,0,1920,1920,'bg').setOrigin(0,0);
        this.physics.world.setBounds(0, 0, 1920, 1920);
        //#endregion

        //#region player sprite
        player = this.physics.add.sprite(background.displayWidth/2,background.displayHeight/2,'player_down').setScale(2);
        player.setSize(player.displayWidth/2, player.displayHeight/4);
        player.setOffset(0, player.displayHeight/4);
        player.setCollideWorldBounds(true);
        //#endregion
        
        //#region keyboard
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        //#endregion
        
        //#region player animation
        this.anims.create({
            key: 'playerAnim_up',
            frames: this.anims.generateFrameNumbers('player_up', {
                start:0,
                end:6
            }),
            framerate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'playerAnim_down',
            frames: this.anims.generateFrameNumbers('player_down', {
                start:0,
                end:6
            }),
            framerate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'playerAnim_left',
            frames: this.anims.generateFrameNumbers('player_left', {
                start:0,
                end:6
            }),
            framerate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'playerAnim_right',
            frames: this.anims.generateFrameNumbers('player_right', {
                start:0,
                end:6
            }),
            framerate: 10,
            repeat: -1
        });
        //#endregion

        //#region camera
        camera = this.cameras.main;
        camera.startFollow(player,0.05, 0.05);
        camera.setBounds(0, 0, 1920, 1920);
        //#endregion
    }

    update() {
        let isAnimPlay = false;
        //#region player movement
        
        if (keyW.isDown) {
            if (player.body.velocity.x == 0) {
                player.setVelocityY(-playerSpeed);
            }else{
                player.setVelocityY(-playerSpeed*0.75);
            }
            player.anims.play('playerAnim_up', true);
            isAnimPlay = true;
            playerFace = 1;

        }else if(keyS.isDown){
            if (player.body.velocity.x == 0) {
                player.setVelocityY(playerSpeed);    
            }else{
                player.setVelocityY(playerSpeed*0.75);    
            }
            
            player.anims.play('playerAnim_down', true);
            isAnimPlay = true;
            playerFace = 2;
        } 

        if(keyA.isDown){
            if (player.body.velocity.y == 0) {
                player.setVelocityX(-playerSpeed);    
            }else{
                player.setVelocityX(-playerSpeed*0.75);
            }
            if(!isAnimPlay){
                player.anims.play('playerAnim_left', true);
            }
            playerFace = 3;
        }else if(keyD.isDown){
            if (player.body.velocity.y == 0) {
                player.setVelocityX(playerSpeed);    
            }else{
                player.setVelocityX(playerSpeed*0.75);    
            }
            
            if(!isAnimPlay){
                player.anims.play('playerAnim_right', true);
            }
            playerFace = 4;
        }

        if(keyW.isUp && keyS.isUp){
            player.setVelocityY(0);
        }
        if(keyA.isUp && keyD.isUp){
            player.setVelocityX(0);
        }
        //#endregion
        
        //#region player animation
        if (keyW.isUp && keyS.isUp && keyA.isUp && keyD.isUp) {
            player.setVelocityX(0);
            player.setVelocityY(0);
            if (playerFace == 1) {
                player.anims.play('playerAnim_up', false);
            } else if(playerFace == 2){
                player.anims.play('playerAnim_down', false);
            } else if(playerFace == 3){
                player.anims.play('playerAnim_left', false);
            } else{
                player.anims.play('playerAnim_right', false);
            }
        }
        //#endregion
        
        //#region  dash
        if (keySpacebar.isDown) {
            if(new Date().getTime() > lastDash + dashCooldown){
                if(player.body.velocity.x!= 0 || player.body.velocity.y!= 0 ){
                    lastDash = new Date().getTime();
                    dashInterval = setInterval(()=>{
                        player.setPosition(player.x+player.body.velocity.x/100, player.y+player.body.velocity.y/100);
                    }, 5);
                }
            }
        }
        
        if((new Date().getTime() - lastDash) > 250){
            clearInterval(dashInterval);
        }
        //#endregion

        if(keyL.isDown){
            this.scene.start('NewScene');
        }
    }
}
export default GameScene;