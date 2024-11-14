import TilemapLayer = Phaser.Tilemaps.TilemapLayer;

export interface MapLayers {
  ground: TilemapLayer;
  walls: TilemapLayer;
}
