import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  BOOKING_VIEWS,
  type BookingView,
  computeBookingStats,
} from './bookings.data';

@Component({
  selector: 'app-bookings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class Bookings {
  private readonly router = inject(Router);

  readonly searchQuery = signal('');
  readonly selectedBooking = signal<BookingView | null>(null);
  readonly allBookings: BookingView[] = BOOKING_VIEWS;

  readonly filteredBookings = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allBookings;
    return this.allBookings.filter(
      b =>
        b.id.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.movieTitle.toLowerCase().includes(q),
    );
  });

  readonly stats = computed(() => computeBookingStats(this.allBookings));

  openModal(booking: BookingView): void {
    this.selectedBooking.set(booking);
    setTimeout(() => {
      const modalEl = document.getElementById('bookingModal');
      if (modalEl) {
        const existing = (window as any).bootstrap?.Modal?.getInstance(modalEl);
        const modal = existing ?? new (window as any).bootstrap.Modal(modalEl);
        modal.show();
      }
    });
  }

  /* ── Template helpers ─────────────────────────────────────────────────── */

  formatDate(iso: string): string {
    if (!iso || iso === '—') return '—';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  formatTime(t: string): string {
    if (!t || t === '—') return '—';
    const [h, m] = t.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
  }

  formatAmount(amount: number): string {
    return `$${amount.toFixed(2)}`;
  }

  goToUser(userId: string): void {
    this.router.navigate(['/users']);
  }

  goToShowtime(showtimeId: string): void {
    this.router.navigate(['/showtimes']);
  }

  goToPayment(paymentId: string): void {
    this.router.navigate(['/payments']);
  }
}
