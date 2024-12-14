import CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
import { createPlayerAnims } from './player.anims';
import { BaseEntity } from '../base-entity';
import { Enemy } from '../enemies/enemy';
import ArcadeColliderType = Phaser.Types.Physics.Arcade.ArcadeColliderType;
import ArcadeBodyCollision = Phaser.Types.Physics.Arcade.ArcadeBodyCollision;
import { Sword } from '../../weapons/melee/sword/sword';
import { HealthBar } from '../../elements/health-bar/health-bar';
import { ContextScene } from '../../scenes/context.scene';
import { GameScene } from '../../scenes/game-scene/game.scene';

export class Player extends BaseEntity {
  private readonly SPEED = 100;
  private readonly BOUNCE_OFF_VELOCITY = 200;

  private readonly cursors: CursorKeys;
  private readonly sword: Sword;
  private readonly healthBar: HealthBar;

  protected health = 100;
  private hasTakenDamage = false;

  public get weapon(): Sword {
    return this.sword;
  }

  constructor(
    scene: ContextScene<unknown>,
    x: number,
    y: number,
    colliders: ArcadeColliderType[] = []
  ) {
    super(scene, x, y, 'player', colliders);

    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.sword = new Sword(this.scene, this);
    this.healthBar = new HealthBar(
      scene,
      100,
      scene.sharedSettings.leftTopCorner.x + 5,
      scene.sharedSettings.leftTopCorner.y + 5,
      100,
      10
    );
    this.healthBar.bar.setScrollFactor(0, 0);

    this.initAnims();
    this.initEvents();
    this.setPushable(false);
  }

  protected override init(): void {
    this.setOffset(3, 10).setBodySize(10, 16, false);
  }

  private initEvents(): void {
    this.scene.input.on('pointerdown', () => this.attack(), this);
  }

  private initAnims(): void {
    createPlayerAnims(this.scene.anims);
    this.play('idle', true);
  }

  protected override onUpdate(): void {
    if (this.scene && this.body) {
      this.flipX = this.isCursorOnRight();

      if (this.hasTakenDamage) {
        return;
      }

      this.addMovement();
    }
  }

  private addMovement(): void {
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
    this.sword.attack();
  }

  private isCursorOnRight(): boolean {
    return (
      this.scene?.input.mousePointer.x <
      Number(this.scene.game.config.width) / 2
    );
  }

  public takeDamage(enemy: Enemy): void {
    if (this.health) {
      this.addDamageTween();
      this.hasTakenDamage = true;
      this.bounceOff(this.body.touching);
      this.scene.time.delayedCall(150, () => (this.hasTakenDamage = false));
      this.decreaseHealth(enemy.ATTACK);
    }
  }

  private decreaseHealth(value: number): void {
    this.health -= value;
    this.healthBar.decreaseHealth(value);

    if (this.health <= 0) {
      (this.scene as GameScene).gameOver();
    }
  }

  private addDamageTween(): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      yoyo: true,
      repeat: 2,
      tint: 0xff0000,
      onComplete: () => this.clearTint(),
    });
  }

  private bounceOff({ right, left, up, down }: ArcadeBodyCollision): void {
    if (right) {
      this.setVelocityX(-this.BOUNCE_OFF_VELOCITY);
    }

    if (left) {
      this.setVelocityX(this.BOUNCE_OFF_VELOCITY);
    }

    if (up) {
      this.setVelocityY(this.BOUNCE_OFF_VELOCITY);
    }

    if (down) {
      this.setVelocityY(-this.BOUNCE_OFF_VELOCITY);
    }
  }
}
