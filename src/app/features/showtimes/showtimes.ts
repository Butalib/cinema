import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  SHOWTIMES,
  type Showtime,
  movieName,
  branchName,
  hallName,
  todayStr,
  computeStats,
} from './showtimes.data';

@Component({
  selector: 'app-showtimes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  templateUrl: './showtimes.html',
  styleUrl: './showtimes.scss',
})
export class Showtimes {
  private readonly router = inject(Router);

  readonly searchQuery = signal('');
  readonly todayOnly = signal(false);
  readonly allShowtimes: Showtime[] = SHOWTIMES;

  readonly filteredShowtimes = computed(() => {
    let list = this.allShowtimes;

    if (this.todayOnly()) {
      const today = todayStr();
      list = list.filter(s => s.date === today);
    }

    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return list;

    return list.filter(
      s =>
        s.id.toLowerCase().includes(q) ||
        movieName(s.movieId).toLowerCase().includes(q) ||
        branchName(s.branchId).toLowerCase().includes(q) ||
        hallName(s.hallId).toLowerCase().includes(q),
    );
  });

  readonly stats = computed(() => computeStats(this.allShowtimes));

  toggleToday(): void {
    this.todayOnly.update(v => !v);
  }

  addShowtime(): void {
    this.router.navigate(['/showtimes', 'add']);
  }

  editShowtime(id: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/showtimes', id, 'edit']);
  }

  deleteShowtime(id: string, event: Event): void {
    event.stopPropagation();
    // Placeholder – would call DELETE API in production
  }

  /* ── Template helpers ─────────────────────────────────────────────────── */

  movieName(id: string): string {
    return movieName(id);
  }

  branchName(id: string): string {
    return branchName(id);
  }

  hallName(id: string): string {
    return hallName(id);
  }

  formatDate(iso: string): string {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatTime(t: string): string {
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}
