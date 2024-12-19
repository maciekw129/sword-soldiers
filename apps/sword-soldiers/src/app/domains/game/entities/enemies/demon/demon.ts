import { Enemy } from '../enemy';
import { Scene } from 'phaser';
import { createDemonAnims } from './demon.anims';
import { BaseEntity } from '../../base-entity';

export class Demon extends Enemy {
  public readonly SPEED = Phaser.Math.Between(30, 40);
  public readonly ATTACK = 10;
  public readonly HEALTH = 100;

  constructor(scene: Scene, x: number, y: number, moveTo: BaseEntity) {
    super(scene, x, y, 'demon', 100, moveTo);

    this.initAnims();
  }

  protected override init() {
    this.setOffset(3, 6).setBodySize(10, 16, false);
  }

  private initAnims(): void {
    createDemonAnims(this.scene.anims);
    this.play('demon-idle', true);
  }
}
