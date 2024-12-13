import { Scene } from 'phaser';
import Body = Phaser.Physics.Arcade.Body;
import { Position } from '../../shared/shared.model';
import { BaseEntity } from '../../entities/base-entity';
import Zone = Phaser.GameObjects.Zone;

export abstract class Melee extends Zone {
  protected ATTACK_MAX_TIME = 100;
  private readonly rangeX: number;
  private readonly rangeY: number;

  protected readonly entity: BaseEntity;

  protected isAttacking = false;

  constructor(
    scene: Scene,
    entity: BaseEntity,
    rangeX: number,
    rangeY: number
  ) {
    super(scene, null, null);

    this.rangeX = rangeX;
    this.rangeY = rangeY;
    this.entity = entity;

    scene.physics.add.existing(this);

    (this.body as Body).setSize(0, 0);

    scene.events.on(Phaser.Scenes.Events.UPDATE, this.onUpdate, this);
  }

  protected onUpdate(): void {
    if (this.entity.body) {
      const { x, y } = this.getPosition(this.entity);

      (this.body as Body).x = x;
      (this.body as Body).y = y;
    }
  }

  public attack(): void {
    (this.body as Body).setSize(this.rangeX, this.rangeY);

    this.scene.time.delayedCall(this.ATTACK_MAX_TIME, () => {
      this.clearAttack();
    });
  }

  public clearAttack(): void {
    (this.body as Body).setSize(0, 0);
  }

  private getPosition(entity: BaseEntity): Position {
    return {
      x: entity.flipX
        ? entity.body.x - 2 * entity.body.width
        : entity.body.x + entity.body.width,
      y:
        entity.body.y -
        (this.rangeY - entity.body.height > 0
          ? (this.rangeY - entity.body.height) / 2
          : 0),
    };
  }
}
