import { Scene } from 'phaser';
import { Melee } from '../melee';
import { BaseEntity } from '../../../entities/base-entity';
import Image = Phaser.GameObjects.Image;

export class Sword extends Melee {
  private readonly sword: Image;

  constructor(scene: Scene, entity: BaseEntity) {
    super(scene, entity, 30, 40);

    this.sword = this.scene.add.image(entity.body.x, entity.body.y, 'sword');
  }

  protected override onUpdate(): void {
    super.onUpdate();

    const { x, y } = this.entity.body;

    this.sword.x = x + this.entity.body.width;
    this.sword.y = y + this.entity.body.height / 2;

    this.sword.setOrigin(0.5, 1);
  }

  public override attack() {
    if (!this.isAttacking) {
      super.attack();

      this.isAttacking = true;

      this.scene.tweens.add({
        targets: this.sword,
        angle: 180,
        duration: this.ATTACK_MAX_TIME,
        onComplete: () => (this.isAttacking = false),
        ease: 'Linear',
        yoyo: true,
        repeat: 0,
      });
    }
  }
}
