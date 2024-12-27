import { Scene } from 'phaser';
import { PlayerSprite } from '../provider/phaser/sprites/player.sprite';
import { CreateMapUsecase } from '../provider/phaser/map/create-map.usecase';

export class Game extends Scene
{

    initX: number = 3211;
    initY: number = 2889;

    camera: Phaser.Cameras.Scene2D.Camera;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    player: PlayerSprite;

    constructor ()
    {
        super('Game');
    }

    create () {
        new CreateMapUsecase(this).execute();
        
        this.camera = this.cameras.main;
        // Ajusta o zoom da câmera
        this.camera.setZoom(2); // Aumenta o zoom da câmera
        //this.camera.setBackgroundColor(0x00ff00);

        this.player = new PlayerSprite(this, this.initX, this.initY);

        // Configura a câmera para seguir o jogador
        this.camera.startFollow(this.player);

        this.setupInputs();
    }

    setupInputs() {
        if (this.input?.keyboard) {
            this.cursors = this.input.keyboard?.createCursorKeys();
        }
    }

    update () {
        let moving = false;
        if (this.cursors.left?.isDown) {
            moving = true;
            this.player.moveLeft();
        } else if (this.cursors.right?.isDown) {
            moving = true;
            this.player.moveRight();
        }
        if (this.cursors.up?.isDown) {
            moving = true;
            this.player.moveUp();
        } else if (this.cursors.down?.isDown) {
            moving = true;
            this.player.moveDown();
        }
        if (!moving) {
            this.player.stop();
        }
    }
}
