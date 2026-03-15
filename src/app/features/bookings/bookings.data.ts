import { MOVIES } from '../movies/movies.data';
import { BRANCHES, HALLS } from '../branches/branches.data';
import { SHOWTIMES, type Showtime, movieName, branchName, hallName } from '../showtimes/showtimes.data';

/* ── Interfaces ───────────────────────────────────────────────────────────── */

export interface Booking {
  id: string;
  userId: string;
  showtimeId: string;
  seats: string[];
  amount: number;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  bookingDate: string;
  paymentId: string;
  paymentMethod: string;
  paymentStatus: string;
}

export interface BookingView extends Booking {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  movieTitle: string;
  branchName: string;
  hallName: string;
  showtimeDate: string;
  showtimeTime: string;
}

/* ── Users look-up (inline to avoid circular dep) ─────────────────────────── */

interface UserRef {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const USERS_REF: UserRef[] = [
  { id: 'USR-001', name: 'Sarah Yaser',    email: 'sarahyaser@gmail.com',     phone: '+20 1003718153' },
  { id: 'USR-002', name: 'Ahmed Hassan',   email: 'ahmed.hassan@gmail.com',   phone: '+20 1112345678' },
  { id: 'USR-003', name: 'Mona Ali',       email: 'mona.ali@outlook.com',     phone: '+20 1009876543' },
  { id: 'USR-004', name: 'Omar Khaled',    email: 'omar.khaled@gmail.com',    phone: '+20 1155443322' },
  { id: 'USR-005', name: 'Nour Salah',     email: 'nour.salah@yahoo.com',     phone: '+20 1066778899' },
  { id: 'USR-006', name: 'Karim Mostafa',  email: 'karim.m@gmail.com',        phone: '+20 1234567890' },
  { id: 'USR-007', name: 'Layla Ibrahim',  email: 'layla.ibrahim@gmail.com',  phone: '+20 1098765432' },
  { id: 'USR-008', name: 'Youssef Nader',  email: 'youssef.n@outlook.com',    phone: '+20 1122334455' },
  { id: 'USR-009', name: 'Hana Samir',     email: 'hana.samir@gmail.com',     phone: '+20 1087654321' },
  { id: 'USR-010', name: 'Tarek Farouk',   email: 'tarek.f@yahoo.com',        phone: '+20 1045678901' },
];

/* ── Mock bookings ────────────────────────────────────────────────────────── */

export const BOOKINGS: Booking[] = [
  { id: 'BK-1001', userId: 'USR-002', showtimeId: 'ST-001', seats: ['A4', 'A5'],             amount: 24,  status: 'Confirmed',  bookingDate: '2026-03-15', paymentId: 'PAY-2001', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
  { id: 'BK-1002', userId: 'USR-001', showtimeId: 'ST-001', seats: ['B2'],                   amount: 12,  status: 'Confirmed',  bookingDate: '2026-03-15', paymentId: 'PAY-2002', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
  { id: 'BK-1003', userId: 'USR-007', showtimeId: 'ST-002', seats: ['C1', 'C2', 'C3'],       amount: 30,  status: 'Confirmed',  bookingDate: '2026-03-15', paymentId: 'PAY-2003', paymentMethod: 'PayPal',      paymentStatus: 'Paid' },
  { id: 'BK-1004', userId: 'USR-004', showtimeId: 'ST-003', seats: ['D6', 'D7'],             amount: 28,  status: 'Completed',  bookingDate: '2026-03-15', paymentId: 'PAY-2004', paymentMethod: 'Debit Card',  paymentStatus: 'Paid' },
  { id: 'BK-1005', userId: 'USR-009', showtimeId: 'ST-003', seats: ['A1', 'A2', 'A3', 'A4'], amount: 56,  status: 'Confirmed',  bookingDate: '2026-03-15', paymentId: 'PAY-2005', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
  { id: 'BK-1006', userId: 'USR-003', showtimeId: 'ST-004', seats: ['E5'],                   amount: 8,   status: 'Cancelled',  bookingDate: '2026-03-15', paymentId: 'PAY-2006', paymentMethod: 'Credit Card', paymentStatus: 'Refunded' },
  { id: 'BK-1007', userId: 'USR-005', showtimeId: 'ST-005', seats: ['B8', 'B9'],             amount: 24,  status: 'Confirmed',  bookingDate: '2026-03-14', paymentId: 'PAY-2007', paymentMethod: 'PayPal',      paymentStatus: 'Paid' },
  { id: 'BK-1008', userId: 'USR-008', showtimeId: 'ST-006', seats: ['A1', 'A2'],             amount: 36,  status: 'Confirmed',  bookingDate: '2026-03-14', paymentId: 'PAY-2008', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
  { id: 'BK-1009', userId: 'USR-002', showtimeId: 'ST-007', seats: ['C4'],                   amount: 10,  status: 'Completed',  bookingDate: '2026-03-14', paymentId: 'PAY-2009', paymentMethod: 'Debit Card',  paymentStatus: 'Paid' },
  { id: 'BK-1010', userId: 'USR-010', showtimeId: 'ST-008', seats: ['D1', 'D2', 'D3'],       amount: 48,  status: 'Cancelled',  bookingDate: '2026-03-13', paymentId: 'PAY-2010', paymentMethod: 'Credit Card', paymentStatus: 'Refunded' },
  { id: 'BK-1011', userId: 'USR-006', showtimeId: 'ST-009', seats: ['A6'],                   amount: 10,  status: 'Confirmed',  bookingDate: '2026-03-13', paymentId: 'PAY-2011', paymentMethod: 'PayPal',      paymentStatus: 'Paid' },
  { id: 'BK-1012', userId: 'USR-004', showtimeId: 'ST-010', seats: ['B3', 'B4'],             amount: 40,  status: 'Confirmed',  bookingDate: '2026-03-13', paymentId: 'PAY-2012', paymentMethod: 'Credit Card', paymentStatus: 'Paid' },
];

/* ── Enriched booking view ────────────────────────────────────────────────── */

export function enrichBooking(b: Booking): BookingView {
  const user = USERS_REF.find(u => u.id === b.userId);
  const st   = SHOWTIMES.find(s => s.id === b.showtimeId);

  return {
    ...b,
    customerName:  user?.name  ?? '—',
    customerEmail: user?.email ?? '—',
    customerPhone: user?.phone ?? '—',
    movieTitle:    st ? movieName(st.movieId)  : '—',
    branchName:    st ? branchName(st.branchId) : '—',
    hallName:      st ? hallName(st.hallId)     : '—',
    showtimeDate:  st?.date ?? '—',
    showtimeTime:  st?.time ?? '—',
  };
}

export const BOOKING_VIEWS: BookingView[] = BOOKINGS.map(enrichBooking);

/* ── Stats ────────────────────────────────────────────────────────────────── */

export function computeBookingStats(list: BookingView[]) {
  const today = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  })();

  const total     = list.length;
  const confirmed = list.filter(b => b.status === 'Confirmed').length;
  const cancelled = list.filter(b => b.status === 'Cancelled').length;
  const todayRev  = list
    .filter(b => b.bookingDate === today && b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.amount, 0);

  return { total, confirmed, cancelled, todayRevenue: todayRev };
}
