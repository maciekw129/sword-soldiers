import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import { Tab, TabList, Tabs } from 'primeng/tabs';
import { NavigationTab } from './navigation-tabs.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { defer, map, startWith, tap } from 'rxjs';
import { getActivatedRouteChildPath } from '@utils/functions';
import { useNavigationUrlChange$ } from '@utils/injection-hooks';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-navigation-tabs',
  standalone: true,
  templateUrl: 'navigation-tabs.component.html',
  imports: [Tabs, TabList, Tab, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationTabsComponent implements OnInit {
  public readonly tabs = input.required<NavigationTab[]>();
  public readonly basePath = input.required<string>();

  private readonly pTabs = viewChild(Tabs);

  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly navigationUrlChange$ = useNavigationUrlChange$();

  private readonly settingsChildPathChange$ = defer(() =>
    this.navigationUrlChange$.pipe(
      startWith([getActivatedRouteChildPath(this.activatedRoute)]),
      map(
        (urlSegments) =>
          urlSegments.filter((segment) => segment !== this.basePath())[0] ??
          null
      ),
      tap((value) => this.pTabs().value.set(value))
    )
  );

  public ngOnInit(): void {
    this.settingsChildPathChange$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
