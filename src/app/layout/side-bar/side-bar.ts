import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
