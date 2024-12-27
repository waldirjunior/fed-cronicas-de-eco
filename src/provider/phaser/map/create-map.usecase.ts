
export class CreateMapUsecase {
    constructor(
        private readonly sceneInstance: Phaser.Scene
    ) {}

    async execute(): Promise<void> {
        const map = this.sceneInstance.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage("default_tiles", 'tilesetNameInPhaserbase1') as Phaser.Tilemaps.Tileset;

        const layers: (Phaser.Tilemaps.TilemapLayer | null)[] = [];
        map.layers.forEach((layer) => {
            const layerInstance = map.createLayer(layer.name, tileset, 0, 0);
            layers.push(layerInstance);
        });

        // Ajusta o tamanho do mundo para o tamanho do mapa
        this.sceneInstance.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        console.log('Mapa criado com sucesso', layers, map);
    }


}