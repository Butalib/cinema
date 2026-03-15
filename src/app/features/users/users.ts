import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookings: number;
  totalSpent: number;
  status: 'Active' | 'Inactive';
  initials: string;
  gender: string;
  dob: string;
  joined: string;
  location: string;
  emailConfirmed: boolean;
}

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  readonly searchQuery = signal('');
  readonly selectedUser = signal<User | null>(null);

  readonly allUsers: User[] = [
    {
      id: 'USR-001', name: 'Sarah Yaser', email: 'sarahyaser@gmail.com',
      phone: '+20 1003718153', bookings: 6, totalSpent: 72, status: 'Active',
      initials: 'SY', gender: 'Female', dob: 'Jan 1, 2000', joined: 'Feb 3, 2026',
      location: 'Mans, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-002', name: 'Ahmed Hassan', email: 'ahmed.hassan@gmail.com',
      phone: '+20 1112345678', bookings: 12, totalSpent: 145, status: 'Active',
      initials: 'AH', gender: 'Male', dob: 'Mar 15, 1995', joined: 'Jan 12, 2026',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-003', name: 'Mona Ali', email: 'mona.ali@outlook.com',
      phone: '+20 1009876543', bookings: 3, totalSpent: 36, status: 'Inactive',
      initials: 'MA', gender: 'Female', dob: 'Jul 22, 1998', joined: 'Dec 5, 2025',
      location: 'Alexandria, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-004', name: 'Omar Khaled', email: 'omar.khaled@gmail.com',
      phone: '+20 1155443322', bookings: 8, totalSpent: 96, status: 'Active',
      initials: 'OK', gender: 'Male', dob: 'Nov 10, 1992', joined: 'Feb 18, 2026',
      location: 'Giza, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-005', name: 'Nour Salah', email: 'nour.salah@yahoo.com',
      phone: '+20 1066778899', bookings: 5, totalSpent: 60, status: 'Active',
      initials: 'NS', gender: 'Female', dob: 'Sep 5, 2001', joined: 'Jan 28, 2026',
      location: 'Luxor, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-006', name: 'Karim Mostafa', email: 'karim.m@gmail.com',
      phone: '+20 1234567890', bookings: 1, totalSpent: 12, status: 'Inactive',
      initials: 'KM', gender: 'Male', dob: 'Apr 18, 1997', joined: 'Nov 20, 2025',
      location: 'Aswan, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-007', name: 'Layla Ibrahim', email: 'layla.ibrahim@gmail.com',
      phone: '+20 1098765432', bookings: 15, totalSpent: 210, status: 'Active',
      initials: 'LI', gender: 'Female', dob: 'Feb 28, 1993', joined: 'Mar 1, 2026',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-008', name: 'Youssef Nader', email: 'youssef.n@outlook.com',
      phone: '+20 1122334455', bookings: 4, totalSpent: 48, status: 'Active',
      initials: 'YN', gender: 'Male', dob: 'Jun 12, 1999', joined: 'Feb 10, 2026',
      location: 'Alexandria, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-009', name: 'Hana Samir', email: 'hana.samir@gmail.com',
      phone: '+20 1087654321', bookings: 9, totalSpent: 108, status: 'Active',
      initials: 'HS', gender: 'Female', dob: 'Aug 3, 1996', joined: 'Jan 5, 2026',
      location: 'Giza, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-010', name: 'Tarek Farouk', email: 'tarek.f@yahoo.com',
      phone: '+20 1045678901', bookings: 2, totalSpent: 24, status: 'Inactive',
      initials: 'TF', gender: 'Male', dob: 'Dec 25, 1990', joined: 'Oct 15, 2025',
      location: 'Suez, Egypt', emailConfirmed: false,
    },
  ];

  readonly filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allUsers;
    return this.allUsers.filter(
      u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q),
    );
  });

  openModal(user: User): void {
    this.selectedUser.set(user);
    setTimeout(() => {
      const modalEl = document.getElementById('userModal');
      if (modalEl) {
        const existing = (window as any).bootstrap?.Modal?.getInstance(modalEl);
        const modal = existing ?? new (window as any).bootstrap.Modal(modalEl);
        modal.show();
      }
    });
  }
}
