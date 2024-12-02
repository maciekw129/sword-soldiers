import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import Phaser, { AUTO, Game } from 'phaser';
import { GameScene } from './scenes/game-scene/game.scene';
import { PreloadScene } from './scenes/preload.scene';
import { GameService } from './game.service';

@Component({
  standalone: true,
  template: '<div class="main-container" id="game-container"></div>',
  styles: ':host {display: grid}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GameService],
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);

  private readonly WIDTH = document.body.offsetWidth;
  private readonly HEIGHT = 500;

  private readonly config: Phaser.Types.Core.GameConfig = {
    title: 'Sword Soldiers',
    type: AUTO,
    width: this.WIDTH,
    height: this.HEIGHT,
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

  private game!: Phaser.Game;

  public ngOnInit(): void {
    this.game = new Game({
      ...this.config,
      scene: [
        new PreloadScene(this.config, this.gameService),
        new GameScene(this.config),
      ],
      parent: 'game-container',
    });
  }

  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
