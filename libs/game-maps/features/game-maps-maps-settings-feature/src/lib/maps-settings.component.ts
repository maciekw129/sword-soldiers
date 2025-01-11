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
import { finalize, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

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
  private readonly messageService = inject(MessageService);

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

  public isLoading = signal(false);

  private readonly reFetchGameMaps$ = new Subject<void>();

  public readonly tableValue$ = this.reFetchGameMaps$.pipe(
    startWith(null),
    tap(() => this.isLoading.set(true)),
    switchMap(() =>
      this.gameMapsHttpService
        .getAllGameMaps$()
        .pipe(finalize(() => this.isLoading.set(false)))
    )
  );

  private removeMap(id: string): void {
    this.confirmationService.confirm({
      header: 'Confirm remove',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Remove',
      },
      message: 'Are you sure you want to remove this map?',
      accept: () => this.getRemoveMapRequest$(id).subscribe(),
    });
  }

  private getRemoveMapRequest$(id: string): Observable<void> {
    return this.gameMapsHttpService.removeGameMap$(id).pipe(
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'You successfully removed map!',
        });
        this.reFetchGameMaps$.next();
      })
    );
  }
}
