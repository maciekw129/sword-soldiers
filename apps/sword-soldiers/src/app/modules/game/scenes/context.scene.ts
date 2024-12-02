import { Scene } from 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;

export abstract class ContextScene<T> extends Scene {
  protected readonly context: T;
  protected readonly gameConfig: GameConfig;

  protected constructor(
    config: string | Phaser.Types.Scenes.SettingsConfig,
    gameConfig: GameConfig,
    context: T
  ) {
    super(config);

    this.context = context;
    this.gameConfig = gameConfig;
  }
}
