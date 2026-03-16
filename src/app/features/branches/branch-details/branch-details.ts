import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BRANCHES, HALLS, type Branch, type Hall } from '../branches.data';

interface ScreenTypeStat {
  label: string;
  icon: string;
  count: number;
  avgSeats: number;
  colorClass: string;
}

@Component({
  selector: 'app-branch-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './branch-details.html',
  styleUrl: './branch-details.scss',
})
export class BranchDetails {
  private readonly router = inject(Router);

  readonly id = input<string>('');

  readonly branch = computed<Branch | undefined>(() =>
    BRANCHES.find(b => b.id === this.id())
  );

  readonly halls = computed<Hall[]>(() =>
    HALLS.filter(h => h.branchId === this.id())
  );

  readonly screenTypeStats = computed<ScreenTypeStat[]>(() => {
    const hs = this.halls();
    const types: { label: string; key: Hall['type']; icon: string; colorClass: string }[] = [
      { label: 'IMAX Screen',   key: 'IMAX',        icon: 'bi-display',    colorClass: 'type-imax' },
      { label: 'Dolby Atmos',   key: 'Dolby Atmos', icon: 'bi-music-note', colorClass: 'type-dolby' },
      { label: 'Standard',      key: 'Standard',    icon: 'bi-camera-reels', colorClass: 'type-standard' },
      { label: 'VIP',           key: 'VIP',         icon: 'bi-award',      colorClass: 'type-vip' },
    ];

    return types.map(t => {
      const filtered = hs.filter(h => h.type === t.key);
      const avg = filtered.length
        ? Math.round(filtered.reduce((sum, h) => sum + h.seats, 0) / filtered.length)
        : 0;
      return { label: t.label, icon: t.icon, count: filtered.length, avgSeats: avg, colorClass: t.colorClass };
    });
  });

  readonly totalCapacity = computed(() =>
    this.halls().reduce((sum, h) => sum + h.seats, 0)
  );

  viewLayout(hall: Hall): void {
    this.router.navigate(['/branches', this.id(), 'halls', hall.id]);
  }

  goBack(): void {
    this.router.navigate(['/branches']);
  }

  lastRowLabel(rows: number): string {
    return String.fromCharCode(64 + rows);
  }
}
