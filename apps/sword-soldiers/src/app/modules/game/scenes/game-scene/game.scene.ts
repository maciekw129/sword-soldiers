import { Player } from '../../entities/player/player';
import { MapLayers } from './game.model';
import ObjectLayer = Phaser.Tilemaps.ObjectLayer;
import TiledObject = Phaser.Types.Tilemaps.TiledObject;
import { Demon } from '../../entities/enemies/demon/demon';
import { ContextScene } from '../context.scene';
import GameConfig = Phaser.Types.Core.GameConfig;

export class GameScene extends ContextScene<null> {
  private player: Player;
  private mapLayers: MapLayers;

  constructor(gameConfig: GameConfig) {
    super('game', gameConfig, null);
  }

  protected create(): void {
    this.mapLayers = this.createMap();
    this.player = this.createPlayer(
      this.findSpawnZone(this.mapLayers.playerZones)
    );

    this.player.addCollider(this, this.mapLayers.walls);

    const demon = this.createDemon(
      this.findSpawnZone(this.mapLayers.enemyZones)
    );

    this.player.addCollider(this, demon);
  }

  private createMap(): MapLayers {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
    const ground = map.createLayer('ground', tileset);
    const walls = map.createLayer('walls', tileset);
    const playerZones = map.getObjectLayer('player_zones');
    const enemyZones = map.getObjectLayer('enemy_zones');

    walls.setCollisionByProperty({ collides: true });

    return { ground, walls, playerZones, enemyZones };
  }

  private createPlayer({ x, y }: TiledObject): Player {
    return new Player(this, x, y);
  }

  private findSpawnZone({ objects }: ObjectLayer): TiledObject {
    return objects.find(({ name }) => name === 'spawn');
  }

  private createDemon({ x, y }: TiledObject): Demon {
    return new Demon(this, x, y);
  }
}
