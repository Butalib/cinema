import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  OnDestroy,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { UserModal } from './user-modal/user-modal';

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
  imports: [UserModal],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users implements AfterViewInit, OnDestroy {
  private readonly PAGE_SIZE = 6;
  private observer: IntersectionObserver | null = null;

  private readonly sentinel = viewChild<ElementRef<HTMLDivElement>>('sentinel');

  readonly searchQuery = signal('');
  readonly selectedUser = signal<User | null>(null);
  readonly displayCount = signal(this.PAGE_SIZE);

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
    {
      id: 'USR-011', name: 'Rania Mahmoud', email: 'rania.mahmoud@gmail.com',
      phone: '+20 1011223344', bookings: 7, totalSpent: 84, status: 'Active',
      initials: 'RM', gender: 'Female', dob: 'May 14, 1994', joined: 'Feb 22, 2026',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-012', name: 'Bassem Adel', email: 'bassem.adel@outlook.com',
      phone: '+20 1099887766', bookings: 11, totalSpent: 132, status: 'Active',
      initials: 'BA', gender: 'Male', dob: 'Aug 30, 1988', joined: 'Jan 30, 2026',
      location: 'Port Said, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-013', name: 'Dina Fathy', email: 'dina.fathy@gmail.com',
      phone: '+20 1077665544', bookings: 0, totalSpent: 0, status: 'Inactive',
      initials: 'DF', gender: 'Female', dob: 'Feb 11, 2002', joined: 'Sep 8, 2025',
      location: 'Ismailia, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-014', name: 'Sherif Nabil', email: 'sherif.n@yahoo.com',
      phone: '+20 1033221100', bookings: 18, totalSpent: 270, status: 'Active',
      initials: 'SN', gender: 'Male', dob: 'Oct 7, 1986', joined: 'Dec 1, 2025',
      location: 'Alexandria, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-015', name: 'Mariam Taher', email: 'mariam.taher@gmail.com',
      phone: '+20 1056789012', bookings: 5, totalSpent: 55, status: 'Active',
      initials: 'MT', gender: 'Female', dob: 'Jul 19, 1999', joined: 'Mar 5, 2026',
      location: 'Giza, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-016', name: 'Khalid Amin', email: 'khalid.amin@gmail.com',
      phone: '+20 1023456789', bookings: 3, totalSpent: 36, status: 'Inactive',
      initials: 'KA', gender: 'Male', dob: 'Apr 2, 1993', joined: 'Aug 14, 2025',
      location: 'Tanta, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-017', name: 'Yasmine Gamal', email: 'yasmine.g@outlook.com',
      phone: '+20 1088990011', bookings: 13, totalSpent: 156, status: 'Active',
      initials: 'YG', gender: 'Female', dob: 'Jan 25, 1991', joined: 'Feb 14, 2026',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-018', name: 'Amr Shafik', email: 'amr.shafik@gmail.com',
      phone: '+20 1044332211', bookings: 6, totalSpent: 66, status: 'Active',
      initials: 'AS', gender: 'Male', dob: 'Jun 8, 1996', joined: 'Jan 20, 2026',
      location: 'Mansoura, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-019', name: 'Noha Wael', email: 'noha.wael@yahoo.com',
      phone: '+20 1065432109', bookings: 2, totalSpent: 18, status: 'Inactive',
      initials: 'NW', gender: 'Female', dob: 'Sep 17, 2003', joined: 'Nov 3, 2025',
      location: 'Zagazig, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-020', name: 'Magdi Ramadan', email: 'magdi.r@gmail.com',
      phone: '+20 1012345098', bookings: 20, totalSpent: 300, status: 'Active',
      initials: 'MR', gender: 'Male', dob: 'Mar 3, 1983', joined: 'Oct 10, 2025',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-021', name: 'Salma Hossam', email: 'salma.hossam@gmail.com',
      phone: '+20 1078901234', bookings: 8, totalSpent: 96, status: 'Active',
      initials: 'SH', gender: 'Female', dob: 'Dec 12, 1997', joined: 'Feb 28, 2026',
      location: 'Alexandria, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-022', name: 'Islam Fouad', email: 'islam.fouad@outlook.com',
      phone: '+20 1034567890', bookings: 4, totalSpent: 40, status: 'Active',
      initials: 'IF', gender: 'Male', dob: 'Nov 22, 1994', joined: 'Jan 7, 2026',
      location: 'Giza, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-023', name: 'Aya Lotfy', email: 'aya.lotfy@gmail.com',
      phone: '+20 1090123456', bookings: 1, totalSpent: 10, status: 'Inactive',
      initials: 'AL', gender: 'Female', dob: 'Aug 9, 2001', joined: 'Jul 19, 2025',
      location: 'Minya, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-024', name: 'Wael Mansour', email: 'wael.mansour@yahoo.com',
      phone: '+20 1056781234', bookings: 14, totalSpent: 168, status: 'Active',
      initials: 'WM', gender: 'Male', dob: 'Feb 6, 1989', joined: 'Dec 20, 2025',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-025', name: 'Ghada Karam', email: 'ghada.karam@gmail.com',
      phone: '+20 1023412345', bookings: 9, totalSpent: 99, status: 'Active',
      initials: 'GK', gender: 'Female', dob: 'Apr 30, 1992', joined: 'Mar 8, 2026',
      location: 'Hurghada, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-026', name: 'Hassan Ezz', email: 'hassan.ezz@gmail.com',
      phone: '+20 1098012345', bookings: 0, totalSpent: 0, status: 'Inactive',
      initials: 'HE', gender: 'Male', dob: 'Jun 15, 2000', joined: 'Jun 1, 2025',
      location: 'Suez, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-027', name: 'Samira Wahid', email: 'samira.wahid@outlook.com',
      phone: '+20 1045601234', bookings: 16, totalSpent: 224, status: 'Active',
      initials: 'SW', gender: 'Female', dob: 'Jan 18, 1987', joined: 'Nov 11, 2025',
      location: 'Cairo, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-028', name: 'Tamer Zaki', email: 'tamer.zaki@gmail.com',
      phone: '+20 1067891234', bookings: 7, totalSpent: 77, status: 'Active',
      initials: 'TZ', gender: 'Male', dob: 'Oct 4, 1995', joined: 'Feb 5, 2026',
      location: 'Alexandria, Egypt', emailConfirmed: true,
    },
    {
      id: 'USR-029', name: 'Farida Nour', email: 'farida.nour@yahoo.com',
      phone: '+20 1012398765', bookings: 3, totalSpent: 27, status: 'Inactive',
      initials: 'FN', gender: 'Female', dob: 'Mar 27, 2002', joined: 'Aug 25, 2025',
      location: 'Damanhur, Egypt', emailConfirmed: false,
    },
    {
      id: 'USR-030', name: 'Adham Saad', email: 'adham.saad@gmail.com',
      phone: '+20 1089012345', bookings: 22, totalSpent: 352, status: 'Active',
      initials: 'AS', gender: 'Male', dob: 'Jul 11, 1985', joined: 'Sep 30, 2025',
      location: 'Cairo, Egypt', emailConfirmed: true,
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

  readonly visibleUsers = computed(() =>
    this.filteredUsers().slice(0, this.displayCount())
  );

  readonly hasMore = computed(() =>
    this.displayCount() < this.filteredUsers().length
  );

  constructor() {
    // Reset pagination when search changes
    effect(() => {
      void this.searchQuery();
      untracked(() => this.displayCount.set(this.PAGE_SIZE));
    });
  }

  ngAfterViewInit(): void {
    const el = this.sentinel()?.nativeElement;
    if (!el) return;

    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && this.hasMore()) {
          this.displayCount.update(c =>
            Math.min(c + this.PAGE_SIZE, this.filteredUsers().length)
          );
        }
      },
      { threshold: 0.1 },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

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
