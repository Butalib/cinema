import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MOVIES } from '../../movies/movies.data';
import { BRANCHES, HALLS } from '../../branches/branches.data';
import { SHOWTIMES, type Showtime } from '../showtimes.data';

@Component({
  selector: 'app-edit-showtime',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-showtime.html',
  styleUrl: './edit-showtime.scss',
})
export class EditShowtime {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly params = toSignal(this.route.params, { initialValue: {} as Record<string, string> });

  readonly showtime = computed<Showtime | undefined>(() => {
    const id = this.params()['id'];
    return SHOWTIMES.find(s => s.id === id);
  });

  readonly movies = MOVIES.filter(m => m.status === 'Active');
  readonly branches = BRANCHES.filter(b => b.status === 'Active');

  readonly movieId = signal('');
  readonly branchId = signal('');
  readonly hallId = signal('');
  readonly date = signal('');
  readonly time = signal('');
  readonly ticketPrice = signal<number | null>(null);
  readonly language = signal('English');

  readonly conflictError = signal('');

  readonly filteredHalls = computed(() => {
    const bid = this.branchId();
    if (!bid) return [];
    return HALLS.filter(h => h.branchId === bid);
  });

  constructor() {
    effect(() => {
      const s = this.showtime();
      if (s) {
        this.movieId.set(s.movieId);
        this.branchId.set(s.branchId);
        this.hallId.set(s.hallId);
        this.date.set(s.date);
        this.time.set(s.time);
        this.ticketPrice.set(s.ticketPrice);
        this.language.set(s.language);
      }
    });
  }

  onBranchChange(val: string): void {
    this.branchId.set(val);
    this.hallId.set('');
    this.conflictError.set('');
  }

  clearConflict(): void {
    this.conflictError.set('');
  }

  submit(): void {
    if (!this.movieId() || !this.branchId() || !this.hallId() || !this.date() || !this.time()) {
      return;
    }

    const conflict = this.detectConflict();
    if (conflict) {
      this.conflictError.set(conflict);
      return;
    }

    // Placeholder – would PUT to API in production
    this.router.navigate(['/showtimes']);
  }

  cancel(): void {
    this.router.navigate(['/showtimes']);
  }

  private detectConflict(): string | null {
    const currentId = this.showtime()?.id;
    const hallId = this.hallId();
    const date = this.date();
    const time = this.time();

    const selectedMovie = MOVIES.find(m => m.id === this.movieId());
    if (!selectedMovie) return null;

    const durationMinutes = this.parseDuration(selectedMovie.duration);
    const cleanupTime = 15;

    const newStart = this.timeToMinutes(time);
    const newEnd = newStart + durationMinutes + cleanupTime;

    const sameDayHall = SHOWTIMES.filter(
      s => s.hallId === hallId && s.date === date && s.id !== currentId,
    );

    for (const existing of sameDayHall) {
      const existingMovie = MOVIES.find(m => m.id === existing.movieId);
      const existingDuration = existingMovie ? this.parseDuration(existingMovie.duration) : 150;
      const existingStart = this.timeToMinutes(existing.time);
      const existingEnd = existingStart + existingDuration + cleanupTime;

      if (newStart < existingEnd && newEnd > existingStart) {
        return 'This hall already has a show scheduled during this time.';
      }
    }

    return null;
  }

  private parseDuration(dur: string): number {
    const hMatch = dur.match(/(\d+)h/);
    const mMatch = dur.match(/(\d+)m/);
    return (hMatch ? parseInt(hMatch[1], 10) * 60 : 0) + (mMatch ? parseInt(mMatch[1], 10) : 0);
  }

  private timeToMinutes(t: string): number {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  }
}
