import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import Phaser, { Game } from 'phaser';
import { GameScene } from './scenes/game-scene/game.scene';
import { PreloadScene } from './scenes/preload.scene';
import { GAME_CONFIG } from './game.config';
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

  private readonly config = GAME_CONFIG;
  private game!: Phaser.Game;

  public ngOnInit(): void {
    this.game = new Game({
      ...this.config,
      scene: [new PreloadScene(this.gameService), new GameScene()],
      parent: 'game-container',
    });
  }

  ngOnDestroy() {
    if (this.game) {
      this.game.destroy(true);
    }
  }
}
