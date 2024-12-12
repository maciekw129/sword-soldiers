import Sprite = Phaser.Physics.Arcade.Sprite;
import { Scene } from 'phaser';
import Texture = Phaser.Textures.Texture;
import ArcadeColliderType = Phaser.Types.Physics.Arcade.ArcadeColliderType;

export abstract class BaseEntity extends Sprite {
  protected abstract health: number;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string | Texture,
    colliders: ArcadeColliderType[] = []
  ) {
    super(scene, x, y, texture);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    this.init();
    this.initUpdateEvent();
    this.initColliders(colliders);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected init(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onUpdate(): void {}

  private initUpdateEvent(): void {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.onUpdate, this);
  }

  private initColliders(colliders: ArcadeColliderType[]): void {
    colliders.forEach((collider) =>
      this.scene.physics.add.collider(this, collider)
    );
  }
}
