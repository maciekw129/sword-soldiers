import { Scene } from 'phaser';
import Texture = Phaser.Textures.Texture;
import { BaseEntity } from '../base-entity';

export abstract class Enemy extends BaseEntity {
  constructor(scene: Scene, x: number, y: number, texture: string | Texture) {
    super(scene, x, y, texture);

    this.setImmovable(true);
  }
}
