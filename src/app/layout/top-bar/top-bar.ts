import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';

import { routes } from '../../app.routes';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  private readonly router = inject(Router);

  private readonly routeChange = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null)
    ),
    { initialValue: null }
  );

  protected readonly title = computed(() => {
    this.routeChange();

    const currentPath = this.router.url.split('?')[0].replace(/^\//, '');
    const activeRoute = routes.find((route) => route.path === currentPath);

    return (activeRoute?.data?.['title'] as string | undefined) ?? 'Dashboard';
  });
}
