let background;

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'NewScene'
        });
    }

    preload() {
        this.load.image('bg', './images/debug-grid-1920x1920.png');
    }

    create() {
        //#region map
        background = this.add.tileSprite(0,0,1920,1920,'bg').setOrigin(0,0);
        this.physics.world.setBounds(0, 0, 1920, 1920);
        //#endregion

        
    }

    update() {
        
    }
}
export default GameScene;