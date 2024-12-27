import { AnimationsModel } from "../model/animations.model";

export default class AnimationBuilder {

    scene: Phaser.Scene;
    sprite: Phaser.GameObjects.Sprite;
    spriteKey: string;
    animations: AnimationsModel;

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
        /*for (const [key, anim] of Object.entries(this.animations)) {
            this.scene.anims.create({
                key: key,
                frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: anim.prefix, start: anim.start, end: anim.end }),
                frameRate: anim.frameRate,
                repeat: anim.repeat
            });
        }*/
        this.scene.anims.create({
            key: 'walk-up',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 31, end: 36 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'idle-up',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 13, end: 18 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'walk-down',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 19, end: 24 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'idle-down',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 1, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'walk-right',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 25, end: 30 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'idle-right',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'walk-left',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 25, end: 30 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            key: 'idle-left',
            frames: this.scene.anims.generateFrameNames(this.spriteKey, { prefix: 'Player_', start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
    }

    playAnimation(key: string) {
        try {
            this.sprite.anims.play(key, true);
        } catch (error) {
            console.error('Erro ao tentar executar animação', key, error);
        }
    }
}