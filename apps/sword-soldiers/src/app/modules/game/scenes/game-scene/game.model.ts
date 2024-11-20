import TilemapLayer = Phaser.Tilemaps.TilemapLayer;
import ObjectLayer = Phaser.Tilemaps.ObjectLayer;

export interface MapLayers {
  ground: TilemapLayer;
  walls: TilemapLayer;
  playerZones: ObjectLayer;
}
