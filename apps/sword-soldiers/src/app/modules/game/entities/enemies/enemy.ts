import { Scene } from 'phaser';
import Texture = Phaser.Textures.Texture;
import { BaseEntity } from '../base-entity';
import { HealthBar } from '../../elements/health-bar/health-bar';

export abstract class Enemy extends BaseEntity {
  public abstract readonly SPEED: number;
  public abstract readonly ATTACK: number;

  private readonly moveTo: BaseEntity;
  private readonly healthBar: HealthBar;

  protected readonly health: number;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string | Texture,
    health: number,
    moveTo: BaseEntity
  ) {
    super(scene, x, y, texture);

    this.moveTo = moveTo;
    this.health = health;

    this.setPushable(false).setOrigin(0);

    this.healthBar = new HealthBar(scene, health, x, y + 10, this.width);
  }

  protected override onUpdate() {
    if (this.moveTo) {
      this.scene.physics.moveToObject(this, this.moveTo, this.SPEED);
    }

    this.healthBar.setPosition(this.x, this.y);
  }
}
