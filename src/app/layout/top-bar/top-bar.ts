import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { SidebarService } from '../sidebar.service';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  private readonly router = inject(Router);
  protected readonly sidebarService = inject(SidebarService);

  private readonly routeChange = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null)
    ),
    { initialValue: null }
  );

  protected readonly title = computed(() => {
    this.routeChange();

    let snapshot = this.router.routerState.snapshot.root;
    let title: string | undefined;

    while (snapshot) {
      if (snapshot.data?.['title']) {
        title = snapshot.data['title'] as string;
      }
      snapshot = snapshot.children[0];
    }

    return title ?? 'Dashboard';
  });
}
