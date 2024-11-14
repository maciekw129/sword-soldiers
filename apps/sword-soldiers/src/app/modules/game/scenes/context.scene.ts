import { Scene } from 'phaser';

export abstract class ContextScene<T> extends Scene {
  protected readonly context: T;

  protected constructor(
    config: string | Phaser.Types.Scenes.SettingsConfig,
    context: T
  ) {
    super(config);

    this.context = context;
  }
}
