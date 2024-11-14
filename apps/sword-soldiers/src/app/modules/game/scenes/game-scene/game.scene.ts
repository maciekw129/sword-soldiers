import { Scene } from 'phaser';
import { Player } from '../../player/player';
import { MapLayers } from './game.model';

export class GameScene extends Scene {
  private player: Player;
  private mapLayers: MapLayers;

  constructor() {
    super('game');
  }

  protected create(): void {
    this.mapLayers = this.createMap();
    this.player = this.createPlayer();

    this.physics.add.collider(this.player, this.mapLayers.walls);
  }

  public override update() {}

  private createMap(): MapLayers {
    const map = this.make.tilemap({ key: 'dungeon' });
    const tileset = map.addTilesetImage('dungeon_tiles', 'dungeon_tiles');
    const ground = map.createLayer('ground', tileset);
    const walls = map.createLayer('walls', tileset);

    walls.setCollisionByProperty({ collides: true });

    return { ground, walls };
  }

  private createPlayer(): Player {
    return new Player(this, 50, 50);
  }
}
