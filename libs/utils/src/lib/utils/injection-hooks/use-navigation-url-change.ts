import { distinctUntilChanged, filter, map, Observable } from 'rxjs';
import { EventType, NavigationEnd, Router } from '@angular/router';
import { inject } from '@angular/core';

export function useNavigationUrlChange$(): Observable<string[]> {
  return inject(Router).events.pipe(
    filter(
      (event): event is NavigationEnd => event.type === EventType.NavigationEnd
    ),
    map(({ url }) => url.split('/').filter(Boolean)),
    distinctUntilChanged()
  );
}
