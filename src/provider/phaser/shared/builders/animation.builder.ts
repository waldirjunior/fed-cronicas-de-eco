import { AnimationsModel } from "../model/animations.model";

export default class AnimationBuilder {

    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite | any;
    spriteKey: string;
    animations: AnimationsModel;

    lastDirection: string = 'down';

    constructor(
        scene: Phaser.Scene,
        sprite: Phaser.GameObjects.Sprite,
        spriteKey: string,
        animations: AnimationsModel
    ) {
        this.scene = scene;
        this.sprite = sprite;
        this.spriteKey = spriteKey;
        this.animations = animations;
    }

    createAnimations() {
        for (const [key, anim] of Object.entries(this.animations)) {
            this.scene.anims.create({
                key: key,
                frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: anim.prefix, start: anim.start, end: anim.end }),
                frameRate: anim.frameRate,
                repeat: anim.repeat
            });
        }
    }

    playAnimation(key: string) {
        try {
            this.sprite.anims.play(key, true);
        } catch (error) {
            console.error('Erro ao tentar executar animação', key, error);
        }
    }

    moveLeft(speed: number) {
        this.sprite.setVelocityX(-speed);
        this.sprite.setFlipX(true); // Inverter a animação horizontalmente
        this.playAnimation('walk-left');
        this.lastDirection = 'left';
    }

    moveRight(speed: number) {
        this.sprite.setVelocityX(speed);
        this.sprite.setFlipX(false); // Não inverter a animação
        this.playAnimation('walk-right');
        this.lastDirection = 'right';
    }

    moveUp(speed: number) {
        this.sprite.setVelocityY(-speed);
        this.sprite.setFlipX(false); // Não inverter a animação
        this.playAnimation('walk-up');
        this.lastDirection = 'up';
    }

    moveDown(speed: number) {
        this.sprite.setVelocityY(speed);
        this.sprite.setFlipX(false); // Não inverter a animação
        this.playAnimation('walk-down');
        this.lastDirection = 'down';
    }

    stopMove(): this {
        this.sprite.setVelocityX(0);
        this.sprite.setVelocityY(0);
        this.playAnimation('idle-' + this.lastDirection);
        return this;
    }
}