import { Scene } from 'phaser';
import Graphics = Phaser.GameObjects.Graphics;

export class HealthBar {
  private readonly bar: Graphics;

  private x: number;
  private y: number;
  private readonly width: number;
  private readonly height: number;

  private value = 100;
  private readonly pixelPerHealth: number;

  constructor(
    scene: Scene,
    health: number,
    x: number,
    y: number,
    width: number,
    height = 4
  ) {
    this.bar = new Graphics(scene);

    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.pixelPerHealth = width / health;

    this.draw();

    scene.add.existing(this.bar);
  }

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.draw();
  }

  private draw(): void {
    this.bar.clear();

    const margin = 1;

    this.bar.fillStyle(0x000000);
    this.bar.fillRect(this.x, this.y, this.width, this.height);

    this.bar.fillStyle(0xffffff);
    this.bar.fillRect(
      this.x + margin,
      this.y + margin,
      this.width - margin * 2,
      this.height - margin * 2
    );

    this.bar.fillStyle(this.value < 30 ? 0xff0000 : 0x00ff00);

    const healthWidth = Math.floor(this.pixelPerHealth * this.value);

    this.bar.fillRect(
      this.x + margin,
      this.y + margin,
      healthWidth - margin * 2,
      this.height - margin * 2
    );
  }
}
