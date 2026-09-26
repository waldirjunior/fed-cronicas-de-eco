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
        this.camera = this.cameras.main;
        this.camera.setZoom(2); // Aumenta o zoom da câmera
        //this.camera.setBackgroundColor(0x00ff00);

        this.createWorld();
        this.createEntities();
        this.setupInputs();

        // Configura a câmera para seguir o jogador
        this.camera.startFollow(this.player);
    }

    createWorld() {
        new CreateMapUsecase(this).execute();
    }

    createEntities() {
        this.player = new PlayerSprite(this, this.initX, this.initY);
    }

    setupInputs() {
        if (this.input?.keyboard) {
            this.cursors = this.input.keyboard?.createCursorKeys();
        }
    }

    update () {
        this.player.update(this.cursors);
    }
}
