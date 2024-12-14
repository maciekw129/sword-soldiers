import { Player } from '../../entities/player/player';
import { MapLayers } from './game.model';
import ObjectLayer = Phaser.Tilemaps.ObjectLayer;
import TiledObject = Phaser.Types.Tilemaps.TiledObject;
import Text = Phaser.GameObjects.Text;
import { ContextScene } from '../context.scene';
import { Enemies } from '../../groups/enemies/enemies';
import { enemyTypes } from '../../entities/enemies/enemy.const';
import { Enemy } from '../../entities/enemies/enemy';
import { SharedSettings } from '../../game.model';

export class GameScene extends ContextScene<null> {
  private player: Player;
  private enemies: Enemies;
  private mapLayers: MapLayers;
  private score = 0;
  private scoreText: Text;

  constructor(sharedSettings: SharedSettings) {
    super('game', sharedSettings);
  }

  protected create(): void {
    this.mapLayers = this.createMap();

    this.player = this.createPlayer(
      this.findSpawnZone(this.mapLayers.playerZones)
    );

    this.enemies = this.createEnemies(this.mapLayers.enemyZones);

    this.createColliders();
    this.createScoreText();
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
    this.cameras.main
      .startFollow(player)
      .setZoom(this.sharedSettings.zoomFactor);
  }

  private findSpawnZone({ objects }: ObjectLayer): TiledObject {
    return objects.find(({ name }) => name === 'spawn');
  }

  private createEnemies(enemyZones: ObjectLayer, quantity = 1): Enemies {
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
      const enemyDied = (enemy as Enemy).takeDamage(this.player.weapon);

      if (enemyDied) {
        this.score++;
        this.updateScoreText();
      }
    });
  }

  private createScoreText(): void {
    const { x, y } = this.sharedSettings.rightTopCorner;

    this.scoreText = this.add
      .text(x - 25, y + 10, '0')
      .setScrollFactor(0)
      .setOrigin(0.5);
  }

  private updateScoreText(): void {
    this.scoreText.setText(`${this.score}`);
  }

  public gameOver(): void {
    this.physics.pause();

    const { x, y } = this.sharedSettings.center;

    this.add
      .text(x, y, 'Game Over!', {
        fontSize: '48px',
        color: '#ff0000',
        fontStyle: 'bold',
      })
      .setScrollFactor(0)
      .setOrigin(0.5);

    const button = this.add
      .text(x, +this.sharedSettings.gameConfig.height / 2 + 50, 'play again', {
        backgroundColor: '#000',
        padding: { x: 5, y: 5 },
      })
      .setInteractive()
      .setScrollFactor(0)
      .setOrigin(0.5);

    button.on(
      'pointerup',
      () => {
        this.scene.restart();
      },
      this
    );
  }
}
