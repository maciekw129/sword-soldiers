import { Scene } from 'phaser';
import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import { createPlayerAnims } from '../../anims/player-anims';
import Tween = Phaser.Tweens.Tween;
import { BaseEntity } from '../base-entity';

export class Player extends BaseEntity {
  private readonly SPEED = 100;
  private readonly cursors: CursorKeys;
  private weaponTween: Tween;
  private weapon: Phaser.GameObjects.Sprite;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.initAnims();
    this.initEvents();
  }

  protected override init(): void {
    this.setOffset(0, 10).setBodySize(this.width, 16, false);
    this.scene.cameras.main.startFollow(this, true);
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

  private attack(): void {
    const isCursorOnRight = this.isCursorOnRight();

    if (this.weaponTween?.isPlaying()) {
      return;
    }

    this.weapon = this.scene.physics.add
      .sprite(this.x, this.y, 'sword')
      .setFlipX(isCursorOnRight)
      .setOrigin(0.5, 1);

    this.weapon.setInteractive();

    this.weaponTween = this.scene.add.tween({
      targets: this.weapon,
      duration: 200,
      angle: this.isCursorOnRight() ? '-=190' : '+=190',
      onComplete: () => {
        this.weapon.destroy();
      },
    });
  }

  private isCursorOnRight(): boolean {
    return this.scene.input.mousePointer.x < 250;
  }
}
