import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MOVIES, MOVIE_STATS, type Movie } from './movies.data';

@Component({
  selector: 'app-movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies {
  private readonly router = inject(Router);

  readonly searchQuery = signal('');
  readonly allMovies: Movie[] = MOVIES;
  readonly stats = MOVIE_STATS;

  readonly filteredMovies = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allMovies;
    return this.allMovies.filter(
      m =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q),
    );
  });

  addMovie(): void {
    this.router.navigate(['/movies', 'add']);
  }

  editMovie(id: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/movies', id, 'edit']);
  }

  deleteMovie(id: string, event: Event): void {
    event.stopPropagation();
    // Placeholder – would trigger a confirmation dialog in production
  }

  formatRevenue(revenue: number): string {
    return revenue > 0 ? `$${revenue.toLocaleString()}` : '—';
  }
}
