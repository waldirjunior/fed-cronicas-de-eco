import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg_eco.jpeg');

        // Load map
        this.load.tilemapTiledJSON('map', 'tiled/one_map.json');
        this.load.image('tilesetNameInPhaserbase1', 'tiled/assets/default_tiles.png');

        // Load player
        this.load.atlas('player', 'assets/game/player/player.png', 'assets/game/player/player.json');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
