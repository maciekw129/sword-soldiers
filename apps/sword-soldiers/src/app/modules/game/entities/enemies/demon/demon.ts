import { Enemy } from '../enemy';
import { Scene } from 'phaser';
import { createDemonAnims } from './demon.anims';
import { Collidible } from '../../../mixins/collidible.mixin';

export class Demon extends Collidible(Enemy) {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'demon');

    this.initAnims();
  }

  protected override init() {
    this.setOffset(0, 6).setBodySize(this.width, 16, false);
  }

  private initAnims(): void {
    createDemonAnims(this.scene.anims);
    this.play('demon-idle', true);
  }
}
