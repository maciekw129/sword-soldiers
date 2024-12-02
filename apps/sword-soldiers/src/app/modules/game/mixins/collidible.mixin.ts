import GameObject = Phaser.GameObjects.GameObject;
import { Scene } from 'phaser';
import Sprite = Phaser.Physics.Arcade.Sprite;
import { AbstractConstructor } from '@utils/types';

export function Collidible<T extends AbstractConstructor<Sprite>>(Base: T) {
  abstract class Collidable extends Base {
    public addCollider(
      scene: Scene,
      objectToCollide: GameObject,
      callback: () => void = null
    ): this {
      scene.physics.add.collider(this, objectToCollide, callback, null, this);
      return this;
    }
  }

  return Collidable;
}
