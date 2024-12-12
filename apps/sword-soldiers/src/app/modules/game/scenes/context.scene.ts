import { Scene } from 'phaser';
import { SharedSettings } from '../game.model';

export abstract class ContextScene<T> extends Scene {
  public readonly context: T;
  public readonly sharedSettings: SharedSettings;

  protected constructor(
    config: string | Phaser.Types.Scenes.SettingsConfig,
    sharedSettings: SharedSettings,
    context?: T
  ) {
    super(config);

    this.context = context;
    this.sharedSettings = sharedSettings;
  }
}
