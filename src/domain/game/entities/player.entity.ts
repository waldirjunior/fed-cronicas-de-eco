import { Scene } from "phaser";
import { GAME_CONFIG } from "../game-config";
import { PlayerSprite } from "../../../provider/phaser/sprites/player.sprite";
import { BaseEntity } from "./base.entity";

export class PlayerEntity extends BaseEntity {
    private readonly sprite: Phaser.Physics.Arcade.Sprite;
    private readonly scene: Scene;
    private speed: number = GAME_CONFIG.PLAYER.SPEED;

    public level: number = 1;
    public hp: number = GAME_CONFIG.PLAYER.INITIAL_HP;
    public maxHp: number = GAME_CONFIG.PLAYER.INITIAL_HP;
    public exp: number = 0;
    public expToNextLevel: number = 100;
    public damage: number = GAME_CONFIG.PLAYER.INITIAL_DAMAGE;

    constructor(scene: Scene, x: number, y: number) {
        super();
        this.scene = scene;
        this.sprite = new PlayerSprite(this.scene, x, y);
    }

    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        if (!this.isCheckAlive()) return;
        this.sprite.update(cursors, this.speed);
    }

    getSprite() {
        return this.sprite;
    }

}