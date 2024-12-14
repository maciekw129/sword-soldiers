import { Scene } from 'phaser';
import { Melee } from '../melee';
import { BaseEntity } from '../../../entities/base-entity';
import Image = Phaser.GameObjects.Image;

export class Sword extends Melee {
  public ATTACK = 20;

  private readonly sword: Image;

  constructor(scene: Scene, entity: BaseEntity) {
    super(scene, entity, 30, 40);

    this.sword = this.scene.add.image(entity.body.x, entity.body.y, 'sword');
  }

  protected override onUpdate(): void {
    super.onUpdate();

    if (this.entity.body) {
      const { x, y, width, height } = this.entity.body;

      this.sword.flipX = this.entity.flipX;

      this.sword.x = this.entity.flipX ? x : x + width;
      this.sword.y = y + height / 2;

      this.sword.setOrigin(0.5, 1);
    }
  }

  public override attack() {
    if (!this.isAttacking) {
      super.attack();

      this.isAttacking = true;

      this.scene.tweens.add({
        targets: this.sword,
        angle: this.getSwordAngle(),
        duration: this.ATTACK_MAX_TIME,
        onComplete: () => (this.isAttacking = false),
        ease: 'Linear',
        yoyo: true,
        repeat: 0,
      });
    }
  }

  private getSwordAngle(): number {
    return this.entity.flipX ? -180 : 180;
  }
}
