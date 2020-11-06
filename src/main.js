import 'phaser';
import GameScene from './scenes/GameScene';
import NewScene from './scenes/NewScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width:800,
    // width: 1920,
    // 600
    height: 600,
    // height: 1920,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y:0}
        }
    },
    scene: [
        GameScene,
        NewScene
    ]
};

const game = new Phaser.Game(config);