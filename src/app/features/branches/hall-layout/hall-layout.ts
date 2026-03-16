import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BRANCHES, HALLS, type Branch, type Hall } from '../branches.data';

export type SeatType = 'standard' | 'booked' | 'vip' | 'disabled';

export interface Seat {
  row: string;
  col: number;
  type: SeatType;
  label: string;
}

@Component({
  selector: 'app-hall-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './hall-layout.html',
  styleUrl: './hall-layout.scss',
})
export class HallLayout {
  private readonly router = inject(Router);

  readonly branchId = input<string>('');
  readonly hallId = input<string>('');

  readonly branch = computed<Branch | undefined>(() =>
    BRANCHES.find(b => b.id === this.branchId())
  );

  readonly hall = computed<Hall | undefined>(() =>
    HALLS.find(h => h.id === this.hallId())
  );

  readonly rows = computed<string[]>(() => {
    const hall = this.hall();
    if (!hall) return [];
    return Array.from({ length: hall.rows }, (_, i) => String.fromCharCode(65 + i));
  });

  readonly cols = computed<number[]>(() => {
    const hall = this.hall();
    if (!hall) return [];
    return Array.from({ length: hall.seatsPerRow }, (_, i) => i + 1);
  });

  readonly seatGrid = computed<Seat[][]>(() => {
    const hall = this.hall();
    if (!hall) return [];

    return this.rows().map(row => {
      return this.cols().map(col => {
        const type = this.getSeatType(hall, row, col);
        return { row, col, type, label: `${row}${col}` };
      });
    });
  });

  readonly summary = computed(() => {
    const seats = this.seatGrid().flat();
    return {
      standard: seats.filter(s => s.type === 'standard').length,
      booked:   seats.filter(s => s.type === 'booked').length,
      vip:      seats.filter(s => s.type === 'vip').length,
      disabled: seats.filter(s => s.type === 'disabled').length,
    };
  });

  readonly totalActive = computed(() => {
    const s = this.summary();
    return s.standard + s.booked + s.vip;
  });

  private getSeatType(hall: Hall, row: string, col: number): SeatType {
    const rowIndex = row.charCodeAt(0) - 65;

    if (hall.type === 'VIP') return 'vip';

    if (rowIndex === hall.rows - 1 && (col === 1 || col === hall.seatsPerRow)) return 'disabled';

    const hash = rowIndex * 31 + col * 17;
    if (hash % 13 === 0 || hash % 19 === 0) return 'booked';

    return 'standard';
  }

  goBack(): void {
    this.router.navigate(['/branches', this.branchId()]);
  }

  lastRowLabel(rows: number): string {
    return String.fromCharCode(64 + rows);
  }
}
