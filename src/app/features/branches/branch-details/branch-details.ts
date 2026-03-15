import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly params = toSignal(this.route.params, { initialValue: {} as Record<string, string> });

  readonly branch = computed<Branch | undefined>(() => {
    const id = this.params()['id'];
    return BRANCHES.find(b => b.id === id);
  });

  readonly halls = computed<Hall[]>(() => {
    const id = this.params()['id'];
    return HALLS.filter(h => h.branchId === id);
  });

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
    const branchId = this.params()['id'];
    this.router.navigate(['/branches', branchId, 'halls', hall.id]);
  }

  goBack(): void {
    this.router.navigate(['/branches']);
  }

  lastRowLabel(rows: number): string {
    return String.fromCharCode(64 + rows);
  }
}
