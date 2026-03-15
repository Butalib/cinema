import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCardComponent {
  readonly icon = input('');
  readonly value = input('');
  readonly label = input('');
  readonly trend = input('');
  readonly trendType = input<'up' | 'down'>('up');
}
