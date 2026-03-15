import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import type { Movie } from '../movies.data';

@Component({
  selector: 'app-add-movie',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss',
})
export class AddMovie {
  private readonly router = inject(Router);

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

  submit(): void {
    // Placeholder – would POST to API in production
    this.router.navigate(['/movies']);
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
