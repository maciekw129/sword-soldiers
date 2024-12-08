import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  viewChild,
  ElementRef,
} from '@angular/core';
import Phaser, { AUTO, Game } from 'phaser';
import { GameScene } from './scenes/game-scene/game.scene';
import { PreloadScene } from './scenes/preload.scene';
import { GameService } from './game.service';

@Component({
  standalone: true,
  templateUrl: 'game.component.html',
  styleUrl: 'game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GameService],
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);

  private readonly gameContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('gameContainer');

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
        // debug: true,
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
  };

  private game!: Phaser.Game;

  public ngOnInit(): void {
    this.game = new Game({
      ...this.config,
      width: this.gameContainer().nativeElement.offsetWidth,
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
