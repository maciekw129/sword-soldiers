import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 's-breadcrumbs',
  standalone: true,
  templateUrl: 'breadcrumbs.component.html',
  styleUrl: 'breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbModule],
})
export class BreadcrumbsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public readonly home: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/',
  };

  public readonly menuItems: WritableSignal<MenuItem[]> = signal([]);

  private routerNavigationChange$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    tap(() =>
      this.menuItems.set(this.createBreadcrumbs(this.activatedRoute.root))
    )
  );

  ngOnInit() {
    this.routerNavigationChange$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1];

      if (lastBreadcrumb) {
        lastBreadcrumb.disabled = true;
      }

      return breadcrumbs;
    }

    children.forEach((child) => {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      const label = child.snapshot.data['breadcrumb'];

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (label && routeURL) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    });

    return breadcrumbs;
  }
}
