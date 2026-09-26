import { Physics } from 'phaser';
import { AnimationsModel } from '../shared/model/animations.model';
import AnimationBuilder from '../shared/builders/animation.builder';
import { GAME_CONFIG } from '../../../domain/game/game-config';

export class PlayerSprite extends Physics.Arcade.Sprite {

    // Classes de sprites
    animationBuilder;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string = 'player') {
        const firstFrame = 'Player_43';
        super(scene, x, y, key, firstFrame);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true); // Evitar que o jogador saia da tela
        this.setBounce(0.2);
        this.setGravityY(0); // Desativar gravidade para este sprite

        this.animationBuilder = new AnimationBuilder(scene, this, key, this.getAnimations());
        this.animationBuilder.createAnimations();
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, speed: number = GAME_CONFIG.PLAYER.SPEED) {
        let moving = false;
        if (cursors.left?.isDown) {
            moving = true;
            this.animationBuilder.moveLeft(speed);
        } else if (cursors.right?.isDown) {
            moving = true;
            this.animationBuilder.moveRight(speed);
        }
        if (cursors.up?.isDown) {
            moving = true;
            this.animationBuilder.moveUp(speed);
        } else if (cursors.down?.isDown) {
            moving = true;
            this.animationBuilder.moveDown(speed);
        }
        if (!moving) {
            this.animationBuilder.stopMove();
        }
    }

    private getAnimations(): AnimationsModel {
        const frameKey = 'Player_';
        return {
            'walk-up': { prefix: frameKey, start: 31, end: 36, frameRate: 10, repeat: -1 },
            'idle-up': { prefix: frameKey, start: 13, end: 18, frameRate: 10, repeat: -1 },
            'walk-down': { prefix: frameKey, start: 19, end: 24, frameRate: 10, repeat: -1 },
            'idle-down': { prefix: frameKey, start: 1, end: 6, frameRate: 10, repeat: -1 },
            'walk-right': { prefix: frameKey, start: 25, end: 30, frameRate: 10, repeat: -1 },
            'idle-right': { prefix: frameKey, start: 7, end: 12, frameRate: 10, repeat: -1 },
            'walk-left': { prefix: frameKey, start: 25, end: 30, frameRate: 10, repeat: -1 },
            'idle-left': { prefix: frameKey, start: 7, end: 12, frameRate: 10, repeat: -1 }
        };
    }

}