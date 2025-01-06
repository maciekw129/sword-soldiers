import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { SETTINGS_TABS } from './settings.const';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { defer, map, startWith, tap } from 'rxjs';
import { useNavigationUrlChange$ } from '@utils/injection-hooks';
import { APP_PATHS } from '../../app.const';
import { AppRoute } from '../../app.model';
import { getActivatedRouteChildPath } from '@utils/functions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  templateUrl: 'settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabList, Tab, RouterLink, RouterOutlet],
})
export class SettingsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly tabs = viewChild(Tabs);

  public readonly settingsTabs = SETTINGS_TABS;

  private readonly navigationUrlChange$ = useNavigationUrlChange$();

  private readonly settingsChildPathChange$ = defer(() =>
    this.navigationUrlChange$.pipe(
      startWith([getActivatedRouteChildPath(this.activatedRoute)]),
      map(
        (urlSegments) =>
          urlSegments.filter(
            (segment) => segment !== APP_PATHS[AppRoute.SETTINGS]
          )[0] ?? null
      ),
      tap((value) => this.tabs().value.set(value))
    )
  );

  public ngOnInit(): void {
    this.settingsChildPathChange$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
