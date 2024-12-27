import { Physics } from 'phaser';
import { AnimationsModel } from '../shared/model/animations.model';
import AnimationBuilder from '../shared/builders/animation.builder';

export class PlayerSprite extends Physics.Arcade.Sprite {

    velocity: number = 80;
    lastDirection: string = 'down';

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

    moveLeft() {
        this.setVelocityX(-this.velocity);
        this.setFlipX(true); // Inverter a animação horizontalmente
        this.animationBuilder.playAnimation('walk-left');
        this.lastDirection = 'left';
    }

    moveRight() {
        this.setVelocityX(this.velocity);
        this.setFlipX(false); // Não inverter a animação
        this.animationBuilder.playAnimation('walk-right');
        this.lastDirection = 'right';
    }

    moveUp() {
        this.setVelocityY(-this.velocity);
        this.setFlipX(false); // Não inverter a animação
        this.animationBuilder.playAnimation('walk-up');
        this.lastDirection = 'up';
    }

    moveDown() {
        this.setVelocityY(this.velocity);
        this.setFlipX(false); // Não inverter a animação
        this.animationBuilder.playAnimation('walk-down');
        this.lastDirection = 'down';
    }

    stop(): this {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.animationBuilder.playAnimation('idle-' + this.lastDirection);
        return this;
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