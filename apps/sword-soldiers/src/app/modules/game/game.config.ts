import Phaser, { AUTO } from 'phaser';

export const GAME_CONFIG: Phaser.Types.Core.GameConfig = {
  title: 'Sword Soldiers',
  type: AUTO,
  width: 1024,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: true,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  parent: 'game-container',
  backgroundColor: '#3b3b3b',
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  autoFocus: true,
  scale: {
    width: 500,
    height: 250,
    zoom: 2,
  },
};
