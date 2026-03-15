import { MOVIES } from '../movies/movies.data';
import { BRANCHES, HALLS } from '../branches/branches.data';

export interface Showtime {
  id: string;
  movieId: string;
  branchId: string;
  hallId: string;
  date: string;
  time: string;
  ticketPrice: number;
  language: string;
  totalSeats: number;
  bookedSeats: number;
}

export const SHOWTIMES: Showtime[] = [
  {
    id: 'ST-001',
    movieId: 'MOV-001',
    branchId: 'BR-001',
    hallId: 'H001',
    date: '2026-03-15',
    time: '19:30',
    ticketPrice: 12,
    language: 'English',
    totalSeats: 45,
    bookedSeats: 32,
  },
  {
    id: 'ST-002',
    movieId: 'MOV-002',
    branchId: 'BR-001',
    hallId: 'H003',
    date: '2026-03-15',
    time: '20:00',
    ticketPrice: 10,
    language: 'English',
    totalSeats: 45,
    bookedSeats: 28,
  },
  {
    id: 'ST-003',
    movieId: 'MOV-004',
    branchId: 'BR-002',
    hallId: 'H007',
    date: '2026-03-15',
    time: '18:00',
    ticketPrice: 14,
    language: 'Arabic',
    totalSeats: 50,
    bookedSeats: 45,
  },
  {
    id: 'ST-004',
    movieId: 'MOV-003',
    branchId: 'BR-002',
    hallId: 'H010',
    date: '2026-03-15',
    time: '21:00',
    ticketPrice: 8,
    language: 'English',
    totalSeats: 55,
    bookedSeats: 12,
  },
  {
    id: 'ST-005',
    movieId: 'MOV-001',
    branchId: 'BR-003',
    hallId: 'H014',
    date: '2026-03-16',
    time: '17:00',
    ticketPrice: 12,
    language: 'English',
    totalSeats: 45,
    bookedSeats: 38,
  },
  {
    id: 'ST-006',
    movieId: 'MOV-004',
    branchId: 'BR-001',
    hallId: 'H006',
    date: '2026-03-16',
    time: '19:00',
    ticketPrice: 18,
    language: 'Arabic',
    totalSeats: 45,
    bookedSeats: 20,
  },
  {
    id: 'ST-007',
    movieId: 'MOV-002',
    branchId: 'BR-003',
    hallId: 'H015',
    date: '2026-03-16',
    time: '20:30',
    ticketPrice: 10,
    language: 'English',
    totalSeats: 45,
    bookedSeats: 15,
  },
  {
    id: 'ST-008',
    movieId: 'MOV-003',
    branchId: 'BR-002',
    hallId: 'H012',
    date: '2026-03-17',
    time: '16:00',
    ticketPrice: 16,
    language: 'English',
    totalSeats: 50,
    bookedSeats: 40,
  },
  {
    id: 'ST-009',
    movieId: 'MOV-001',
    branchId: 'BR-002',
    hallId: 'H008',
    date: '2026-03-17',
    time: '22:00',
    ticketPrice: 10,
    language: 'English',
    totalSeats: 39,
    bookedSeats: 5,
  },
  {
    id: 'ST-010',
    movieId: 'MOV-004',
    branchId: 'BR-003',
    hallId: 'H018',
    date: '2026-03-17',
    time: '18:30',
    ticketPrice: 20,
    language: 'Arabic',
    totalSeats: 40,
    bookedSeats: 35,
  },
];

/* ── Helper look-ups ──────────────────────────────────────────────────────── */

export function movieName(id: string): string {
  return MOVIES.find(m => m.id === id)?.title ?? '—';
}

export function branchName(id: string): string {
  return BRANCHES.find(b => b.id === id)?.name ?? '—';
}

export function hallName(id: string): string {
  return HALLS.find(h => h.id === id)?.name ?? '—';
}

/* ── Today helpers (current date = 2026-03-15) ────────────────────────────── */

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function computeStats(list: Showtime[]) {
  const today = todayStr();
  const todayShows = list.filter(s => s.date === today).length;
  const totalSeats = list.reduce((sum, s) => sum + s.totalSeats, 0);
  const bookedSeats = list.reduce((sum, s) => sum + s.bookedSeats, 0);
  const occupancy = totalSeats > 0 ? ((bookedSeats / totalSeats) * 100).toFixed(1) : '0.0';
  return { todayShows, totalSeats, bookedSeats, occupancy };
}
