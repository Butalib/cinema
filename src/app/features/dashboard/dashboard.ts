import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatCardComponent } from './components/stat-card/stat-card';
import { RevenueChartComponent } from './components/revenue-chart/revenue-chart';
import { BookingsChartComponent } from './components/bookings-chart/bookings-chart';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StatCardComponent, RevenueChartComponent, BookingsChartComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
