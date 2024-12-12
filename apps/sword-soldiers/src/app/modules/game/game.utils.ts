import { Position } from './game.model';

export class GameUtils {
  public static calculateLeftTopCorner(
    width: number,
    height: number,
    zoomFactor: number
  ): Position {
    return {
      x: (width - width / zoomFactor) / 2,
      y: (height - height / zoomFactor) / 2,
    };
  }

  public static calculateRightTopCorner(
    width: number,
    height: number,
    zoomFactor: number
  ): Position {
    return {
      x: (width - width / zoomFactor) / 2 + width / zoomFactor,
      y: (height - height / zoomFactor) / 2,
    };
  }
}
