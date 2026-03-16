import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MOVIES, type Movie } from '../movies.data';

@Component({
  selector: 'app-edit-movie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  templateUrl: './edit-movie.html',
  styleUrl: './edit-movie.scss',
})
export class EditMovie {
  private readonly router = inject(Router);

  readonly id = input<string>('');

  readonly movie = computed<Movie | undefined>(() =>
    MOVIES.find(m => m.id === this.id())
  );

  readonly title = signal('');
  readonly genre = signal('');
  readonly duration = signal('');
  readonly rating = signal<number | null>(null);
  readonly releaseDate = signal('');
  readonly language = signal('');
  readonly ageRating = signal('');
  readonly status = signal<Movie['status']>('Active');
  readonly director = signal('');
  readonly cast = signal('');
  readonly description = signal('');

  constructor() {
    effect(() => {
      const m = this.movie();
      if (m) {
        this.title.set(m.title);
        this.genre.set(m.genre);
        this.duration.set(m.duration);
        this.rating.set(m.rating);
        this.releaseDate.set(m.releaseDate);
        this.language.set(m.language);
        this.ageRating.set(m.ageRating);
        this.status.set(m.status);
        this.director.set(m.director);
        this.cast.set(m.cast.join(', '));
        this.description.set(m.description);
      }
    });
  }

  submit(): void {
    // Placeholder – would PUT to API in production
    this.router.navigate(['/movies']);
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
