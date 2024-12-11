import { Player } from '../../entities/player/player';
import { MapLayers } from './game.model';
import ObjectLayer = Phaser.Tilemaps.ObjectLayer;
import TiledObject = Phaser.Types.Tilemaps.TiledObject;
import { ContextScene } from '../context.scene';
import GameConfig = Phaser.Types.Core.GameConfig;
import { Enemies } from '../../groups/enemies/enemies';
import { enemyTypes } from '../../entities/enemies/enemy.const';
import { Enemy } from '../../entities/enemies/enemy';

export class GameScene extends ContextScene<null> {
  private player: Player;
  private enemies: Enemies;
  private mapLayers: MapLayers;

  constructor(gameConfig: GameConfig) {
    super('game', gameConfig, null);
  }

  protected create(): void {
    this.mapLayers = this.createMap();

    this.player = this.createPlayer(
      this.findSpawnZone(this.mapLayers.playerZones)
    );

    this.enemies = this.createEnemies(this.mapLayers.enemyZones);

    this.createColliders();
    this.setFollowUpCamera(this.player);
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

  private setFollowUpCamera(player: Player): void {
    this.cameras.main.setZoom(2.25);
    this.cameras.main.startFollow(player, true);
  }

  private findSpawnZone({ objects }: ObjectLayer): TiledObject {
    return objects.find(({ name }) => name === 'spawn');
  }

  private createEnemies(enemyZones: ObjectLayer, quantity = 4): Enemies {
    const enemies = new Enemies(this);

    enemyZones.objects.forEach(({ type, x, y }) => {
      this.time.addEvent({
        delay: 2000,
        callback: () => {
          const enemy = new enemyTypes[type](this, x, y, this.player);
          enemies.add(enemy);
        },
        repeat: quantity - 1,
      });
    });

    return enemies;
  }

  private createColliders(): void {
    this.physics.add.collider(this.player, this.mapLayers.walls);
    this.physics.add.collider(this.enemies, this.mapLayers.walls);
    this.physics.add.collider(this.enemies, this.enemies);

    this.physics.add.collider(
      this.enemies,
      this.player,
      (enemy) => this.player.takeDamage(enemy as Enemy),
      null
    );

    this.physics.add.overlap(this.enemies, this.player.weapon, (enemy) => {
      (enemy as Enemy).takeDamage(this.player.attackPower);
      this.player.weapon.clearAttack();
    });
  }
}
