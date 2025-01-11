import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonComponent, TableAction, TableComponent } from '@ui/components';
import { RouterLink } from '@angular/router';
import { MAPS_PATHS, MAPS_TABLE_COLUMNS } from './maps-settings.const';
import { MapsRoutes } from './maps-settings.model';
import { GameMapDto, GameMapsHttpService } from '@game-maps/data-access';
import { AsyncPipe } from '@angular/common';
import { finalize } from 'rxjs';
import { ConfirmationService, PrimeIcons } from 'primeng/api';

@Component({
  standalone: true,
  templateUrl: 'maps-settings.component.html',
  styleUrl: 'map-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, RouterLink, TableComponent, AsyncPipe],
})
export class MapsSettingsComponent {
  private readonly gameMapsHttpService = inject(GameMapsHttpService);
  private readonly confirmationService = inject(ConfirmationService);

  public readonly mapsPaths = MAPS_PATHS;
  public readonly createMapPath = this.mapsPaths[MapsRoutes.CREATE];
  public readonly mapsTableColumns = MAPS_TABLE_COLUMNS;

  public readonly mapsTableActions: TableAction<GameMapDto>[] = [
    {
      icon: PrimeIcons.TRASH,
      label: 'Remove',
      callback: ({ id }) => this.removeMap(id),
    },
  ];

  public isLoading = signal(true);

  public readonly tableValue$ = this.gameMapsHttpService
    .getAllGameMaps$()
    .pipe(finalize(() => this.isLoading.set(false)));

  private removeMap(id: string): void {
    this.isLoading.set(true);

    this.confirmationService.confirm({
      header: 'Confirmation',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Remove',
      },
      message: 'Are you sure you want to remove this map?',
      accept: () => {
        this.gameMapsHttpService
          .removeGameMap$(id)
          .pipe(finalize(() => this.isLoading.set(false)))
          .subscribe();
      },
    });
  }
}
