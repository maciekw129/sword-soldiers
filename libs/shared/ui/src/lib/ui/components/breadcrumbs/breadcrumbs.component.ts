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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { useNavigationUrlChange$ } from '@utils/injection-hooks';

@Component({
  selector: 'ui-breadcrumbs',
  standalone: true,
  templateUrl: 'breadcrumbs.component.html',
  styleUrl: 'breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BreadcrumbModule, RouterLink],
})
export class BreadcrumbsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public readonly home: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/',
  };

  public readonly menuItems: WritableSignal<MenuItem[]> = signal([]);

  private routerNavigationChange$ = useNavigationUrlChange$().pipe(
    tap(() =>
      this.menuItems.set(this.createBreadcrumbs(this.activatedRoute.root))
    )
  );

  public ngOnInit(): void {
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
        breadcrumbs.push({ label, routerLink: url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    });

    return breadcrumbs;
  }
}
