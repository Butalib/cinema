import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BRANCHES, BRANCH_STATS, type Branch } from './branches.data';

@Component({
  selector: 'app-branches',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './branches.html',
  styleUrl: './branches.scss',
})
export class Branches {
  private readonly router = inject(Router);

  readonly branches: Branch[] = BRANCHES;
  readonly stats = BRANCH_STATS;

  viewBranch(id: string): void {
    this.router.navigate(['/branches', id]);
  }

  deleteBranch(id: string, event: Event): void {
    event.stopPropagation();
    // Placeholder – would trigger a confirmation dialog in production
  }
}
