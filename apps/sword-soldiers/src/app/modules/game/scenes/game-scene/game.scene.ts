import { Scene } from 'phaser';
import { Player } from '../../entities/player/player';
import { MapLayers } from './game.model';
import ObjectLayer = Phaser.Tilemaps.ObjectLayer;
import TiledObject = Phaser.Types.Tilemaps.TiledObject;

export class GameScene extends Scene {
  private player: Player;
  private mapLayers: MapLayers;

  constructor() {
    super('game');
  }

  protected create(): void {
    this.mapLayers = this.createMap();
    this.player = this.createPlayer(
      this.getPlayerSpawnZone(this.mapLayers.playerZones)
    );

    this.physics.add.collider(this.player, this.mapLayers.walls);
  }

  private createMap(): MapLayers {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
    const ground = map.createLayer('ground', tileset);
    const walls = map.createLayer('walls', tileset);
    const playerZones = map.getObjectLayer('player_zones');

    walls.setCollisionByProperty({ collides: true });

    return { ground, walls, playerZones };
  }

  private createPlayer({ x, y }: TiledObject): Player {
    return new Player(this, x, y);
  }

  private getPlayerSpawnZone({ objects }: ObjectLayer): TiledObject {
    return objects.find(({ name }) => name === 'spawn');
  }
}
