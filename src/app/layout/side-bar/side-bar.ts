import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SidebarService } from '../sidebar.service';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-side-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss',
})
export class SideBar {
  protected readonly sidebarService = inject(SidebarService);
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.sidebarService.close();
    });
  }

  protected readonly menuItems: SidebarItem[] = [


    { label: 'Dashboard', icon: 'bi-grid', route: '/dashboard' },
    { label: 'Users', icon: 'bi-people', route: '/users' },
    { label: 'Branches', icon: 'bi-building', route: '/branches' },
    { label: 'Movies', icon: 'bi-film', route: '/movies' },
    { label: 'Showtimes', icon: 'bi-calendar-event', route: '/showtimes' },
    { label: 'Bookings', icon: 'bi-ticket-perforated', route: '/bookings' },
    { label: 'Payments', icon: 'bi-credit-card', route: '/payments' },
    { label: 'Reports', icon: 'bi-bar-chart', route: '/reports' },
    { label: 'Settings', icon: 'bi-gear', route: '/settings' }
  ];

}
