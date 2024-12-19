import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  viewChild,
  ElementRef,
  computed,
} from '@angular/core';
import Phaser, { AUTO, Game } from 'phaser';
import { GameScene } from './scenes/game-scene/game.scene';
import { PreloadScene } from './scenes/preload.scene';
import { GameService } from './game.service';
import { SharedSettings } from './game.model';
import { GameUtils } from './game.utils';

@Component({
  standalone: true,
  templateUrl: 'game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GameService],
})
export class GameComponent implements OnInit, OnDestroy {
  private readonly gameService = inject(GameService);

  private readonly gameContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('gameContainer');

  private readonly width = computed(
    () => this.gameContainer().nativeElement.offsetWidth
  );

  private readonly HEIGHT = 500;
  private readonly ZOOM_FACTOR = 2.25;

  private get config(): Phaser.Types.Core.GameConfig {
    return {
      title: 'Sword Soldiers',
      type: AUTO,
      height: this.HEIGHT,
      width: this.width(),
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0, x: 0 },
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
  }

  private get sharedSettings(): SharedSettings {
    return {
      gameConfig: this.config,
      zoomFactor: this.ZOOM_FACTOR,
      center: GameUtils.calculateCenter(this.width(), this.HEIGHT),
      leftTopCorner: GameUtils.calculateLeftTopCorner(
        this.width(),
        this.HEIGHT,
        this.ZOOM_FACTOR
      ),
      rightTopCorner: GameUtils.calculateRightTopCorner(
        this.width(),
        this.HEIGHT,
        this.ZOOM_FACTOR
      ),
    };
  }

  private game!: Phaser.Game;

  public ngOnInit(): void {
    this.game = new Game({
      ...this.config,
      scene: [
        new PreloadScene(this.sharedSettings, this.gameService),
        new GameScene(this.sharedSettings),
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
