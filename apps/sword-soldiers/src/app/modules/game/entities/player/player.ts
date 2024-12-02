import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import { createPlayerAnims } from './player.anims';
import { BaseEntity } from '../base-entity';
import { Collidible } from '../../mixins/collidible.mixin';
import { Scene } from 'phaser';

export class Player extends Collidible(BaseEntity) {
  private readonly SPEED = 100;
  private readonly cursors: CursorKeys;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.initAnims();
    this.initEvents();
  }

  protected override init(): void {
    this.setOffset(0, 10).setBodySize(this.width, 16, false);
  }

  private initEvents(): void {
    this.scene.input.on('pointerdown', () => this.attack(), this);
  }

  private initAnims(): void {
    createPlayerAnims(this.scene.anims);
    this.play('idle', true);
  }

  protected override onUpdate(): void {
    this.createMovement();

    this.flipX = this.isCursorOnRight();
  }

  private createMovement(): void {
    const { left, right, up, down } = this.cursors;

    if (left.isDown) {
      this.playRunAnimation();
      this.setVelocity(-this.SPEED, 0);
    } else if (right.isDown) {
      this.playRunAnimation();
      this.setVelocity(this.SPEED, 0);
    } else if (up.isDown) {
      this.playRunAnimation();
      this.setVelocity(0, -this.SPEED);
    } else if (down.isDown) {
      this.playRunAnimation();
      this.setVelocity(0, this.SPEED);
    } else {
      this.setVelocity(0);
    }
  }

  private playRunAnimation(): void {
    this.anims.play('run', true);
    this.playAfterRepeat('idle', 0);
  }

  private attack(): void {}

  private isCursorOnRight(): boolean {
    return (
      this.scene.input.mousePointer.x < Number(this.scene.game.config.width) / 2
    );
  }
}
