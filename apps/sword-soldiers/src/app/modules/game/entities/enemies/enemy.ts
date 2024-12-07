import { Scene } from 'phaser';
import Texture = Phaser.Textures.Texture;
import { BaseEntity } from '../base-entity';

export abstract class Enemy extends BaseEntity {
  public abstract readonly SPEED: number;
  public abstract readonly ATTACK: number;

  private readonly moveTo: BaseEntity;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string | Texture,
    moveTo: BaseEntity
  ) {
    super(scene, x, y, texture);

    this.moveTo = moveTo;

    this.setPushable(false);
  }

  protected override onUpdate() {
    if (this.moveTo) {
      this.scene.physics.moveToObject(this, this.moveTo, this.SPEED);
    }
  }
}
