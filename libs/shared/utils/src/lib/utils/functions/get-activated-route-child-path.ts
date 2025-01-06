import { ActivatedRoute } from '@angular/router';

export function getActivatedRouteChildPath(
  activatedRoute: ActivatedRoute
): string {
  return activatedRoute?.firstChild?.snapshot?.routeConfig?.path ?? '';
}
