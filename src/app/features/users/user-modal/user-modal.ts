import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { User } from '../users';

@Component({
  selector: 'app-user-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './user-modal.html',
  styleUrl: './user-modal.scss',
})
export class UserModal {
  readonly user = input<User | null>(null);
}
