import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GameMapsHttpService } from '@game-maps/data-access';
import { Carousel } from 'primeng/carousel';
import { UpperCasePipe } from '@angular/common';
import { DIFFICULTY_LABELS } from '@game-maps/domain';
import { getLabelPipe } from '@utils/pipes';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@ui/components';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: 'select-map.component.html',
  styleUrl: 'select-map.component.scss',
  imports: [Carousel, UpperCasePipe, getLabelPipe, ButtonComponent, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMapComponent {
  private readonly gameMapsHttpService = inject(GameMapsHttpService);

  public readonly difficultyLabels = DIFFICULTY_LABELS;

  public readonly gameMaps = toSignal(
    this.gameMapsHttpService.getAllGameMaps$()
  );
}
