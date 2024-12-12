import GameConfig = Phaser.Types.Core.GameConfig;

export interface SharedSettings {
  gameConfig: GameConfig;
  zoomFactor: number;
  leftTopCorner: Position;
  rightTopCorner: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}
