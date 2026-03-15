export interface Branch {
  id: string;
  name: string;
  location: string;
  halls: number;
  capacity: number;
  status: 'Active' | 'Inactive';
}

export interface Hall {
  id: string;
  branchId: string;
  name: string;
  type: 'IMAX' | 'Dolby Atmos' | 'Standard' | 'VIP';
  seats: number;
  rows: number;
  seatsPerRow: number;
  rowStart: string; // e.g. 'A'
}

export const BRANCHES: Branch[] = [
  { id: 'BR-001', name: 'Galaxy Cinema',    location: 'Mansoura City', halls: 6, capacity: 1200, status: 'Active' },
  { id: 'BR-002', name: 'Downtown Cinema',  location: 'Cairo',         halls: 7, capacity: 1400, status: 'Active' },
  { id: 'BR-003', name: 'Star Cinema',      location: 'Alexandria',    halls: 5, capacity: 1060, status: 'Active' },
  { id: 'BR-004', name: 'Nile Cinema',      location: 'Giza',          halls: 5, capacity: 1200, status: 'Inactive' },
];

export const HALLS: Hall[] = [
  // BR-001 – Galaxy Cinema
  { id: 'H001', branchId: 'BR-001', name: 'IMAX Screen 1',    type: 'IMAX',        seats: 45, rows: 8, seatsPerRow: 13, rowStart: 'A' },
  { id: 'H002', branchId: 'BR-001', name: 'IMAX Screen 2',    type: 'IMAX',        seats: 45, rows: 7, seatsPerRow: 40, rowStart: 'A' },
  { id: 'H003', branchId: 'BR-001', name: 'Dolby Atmos 1',    type: 'Dolby Atmos', seats: 45, rows: 6, seatsPerRow: 30, rowStart: 'A' },
  { id: 'H004', branchId: 'BR-001', name: 'Dolby Atmos 2',    type: 'Dolby Atmos', seats: 45, rows: 8, seatsPerRow: 20, rowStart: 'A' },
  { id: 'H005', branchId: 'BR-001', name: 'Standard Screen 1',type: 'Standard',    seats: 45, rows: 8, seatsPerRow: 15, rowStart: 'A' },
  { id: 'H006', branchId: 'BR-001', name: 'VIP Suite 1',      type: 'VIP',         seats:  45, rows: 5, seatsPerRow:  9, rowStart: 'A' },

  // BR-002 – Downtown Cinema
  { id: 'H007', branchId: 'BR-002', name: 'IMAX Screen 1',    type: 'IMAX',        seats: 50, rows: 8, seatsPerRow: 18, rowStart: 'A' },
  { id: 'H008', branchId: 'BR-002', name: 'Dolby Atmos 1',    type: 'Dolby Atmos', seats: 39, rows: 8, seatsPerRow: 25, rowStart: 'A' },
  { id: 'H009', branchId: 'BR-002', name: 'Dolby Atmos 2',    type: 'Dolby Atmos', seats: 75, rows: 6, seatsPerRow: 30, rowStart: 'A' },
  { id: 'H010', branchId: 'BR-002', name: 'Standard Screen 1',type: 'Standard',    seats: 55, rows: 10,seatsPerRow: 15, rowStart: 'A' },
  { id: 'H011', branchId: 'BR-002', name: 'Standard Screen 2',type: 'Standard',    seats: 10, rows:  8,seatsPerRow: 16, rowStart: 'A' },
  { id: 'H012', branchId: 'BR-002', name: 'VIP Suite 1',      type: 'VIP',         seats:  50, rows:  5,seatsPerRow: 10, rowStart: 'A' },
  { id: 'H013', branchId: 'BR-002', name: 'VIP Suite 2',      type: 'VIP',         seats:  50, rows:  5,seatsPerRow: 10, rowStart: 'A' },

  // BR-003 – Star Cinema
  { id: 'H014', branchId: 'BR-003', name: 'IMAX Screen 1',    type: 'IMAX',        seats: 45, rows: 8, seatsPerRow: 37, rowStart: 'A' },
  { id: 'H015', branchId: 'BR-003', name: 'Dolby Atmos 1',    type: 'Dolby Atmos', seats: 45, rows: 7, seatsPerRow: 27, rowStart: 'A' },
  { id: 'H016', branchId: 'BR-003', name: 'Standard Screen 1',type: 'Standard',    seats: 45, rows: 8, seatsPerRow: 15, rowStart: 'A' },
  { id: 'H017', branchId: 'BR-003', name: 'Standard Screen 2',type: 'Standard',    seats: 45, rows: 8, seatsPerRow: 15, rowStart: 'A' },
  { id: 'H018', branchId: 'BR-003', name: 'VIP Suite 1',      type: 'VIP',         seats:  40, rows: 4, seatsPerRow: 10, rowStart: 'A' },

  // BR-004 – Nile Cinema
  { id: 'H019', branchId: 'BR-004', name: 'IMAX Screen 1',    type: 'IMAX',        seats: 45, rows: 8, seatsPerRow: 38, rowStart: 'A' },
  { id: 'H020', branchId: 'BR-004', name: 'Dolby Atmos 1',    type: 'Dolby Atmos', seats: 45, rows: 6, seatsPerRow: 28, rowStart: 'A' },
  { id: 'H021', branchId: 'BR-004', name: 'Standard Screen 1',type: 'Standard',    seats: 45, rows: 8, seatsPerRow: 15, rowStart: 'A' },
  { id: 'H022', branchId: 'BR-004', name: 'Standard Screen 2',type: 'Standard',    seats: 45, rows: 8, seatsPerRow: 15, rowStart: 'A' },
  { id: 'H023', branchId: 'BR-004', name: 'VIP Suite 1',      type: 'VIP',         seats:  45, rows: 5, seatsPerRow:  9, rowStart: 'A' },
];

export const BRANCH_STATS = {
  totalBranches: 4,
  totalHalls: 23,
  totalScreens: 34,
  totalCapacity: '4,860',
};
