import { playerSpriteMap, playerSpriteUrls } from '../player/player.const';
import { ContextScene } from './context.scene';
import { GameService } from '../game.service';

export class PreloadScene extends ContextScene<GameService> {
  constructor(context: GameService) {
    super('PreloadScene', context);
  }

  private preload(): void {
    this.load.spritesheet(this.createSpritesheet());
    this.load.spritesheet({
      key: 'demon',
      url: 'game-assets/sprites/demon.png',
      frameConfig: { frameWidth: 16, frameHeight: 23 },
    });
    this.load.image('dungeon_tiles', 'game-assets/tiles/dungeon_tiles.png');
    this.load.tilemapTiledJSON('dungeon', 'game-assets/tiles/dungeon_001.json');
    this.load.image('sword', 'game-assets/items/sword.png');
  }

  public create(): void {
    this.scene.run('game');
  }

  private createSpritesheet(): Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig {
    const { character, gender } = this.context.getUser();

    return {
      key: 'player',
      url: playerSpriteUrls[playerSpriteMap[character][gender]],
      frameConfig: { frameWidth: 16, frameHeight: 28 },
    };
  }
}
