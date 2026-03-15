import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    data: { title: 'Dashboard' },
  },
  {
    path: 'users',
    loadComponent: () => import('./features/users/users').then(m => m.Users),
    data: { title: 'Users' },
  },
  {
    path: 'branches',
    loadComponent: () => import('./features/branches/branches').then(m => m.Branches),
    data: { title: 'Branches' },
  },
  {
    path: 'branches/:id',
    loadComponent: () => import('./features/branches/branch-details/branch-details').then(m => m.BranchDetails),
    data: { title: 'Branch Details' },
  },
  {
    path: 'branches/:branchId/halls/:hallId',
    loadComponent: () => import('./features/branches/hall-layout/hall-layout').then(m => m.HallLayout),
    data: { title: 'Hall Layout' },
  },
  {
    path: 'movies',
    loadComponent: () => import('./features/movies/movies').then(m => m.Movies),
    data: { title: 'Movies' },
  },
  {
    path: 'movies/add',
    loadComponent: () => import('./features/movies/add-movie/add-movie').then(m => m.AddMovie),
    data: { title: 'Add Movie' },
  },
  {
    path: 'movies/:id/edit',
    loadComponent: () => import('./features/movies/edit-movie/edit-movie').then(m => m.EditMovie),
    data: { title: 'Edit Movie' },
  },
  {
    path: 'showtimes',
    loadComponent: () => import('./features/showtimes/showtimes').then(m => m.Showtimes),
    data: { title: 'Showtimes' },
  },
  {
    path: 'showtimes/add',
    loadComponent: () => import('./features/showtimes/add-showtime/add-showtime').then(m => m.AddShowtime),
    data: { title: 'Add Showtime' },
  },
  {
    path: 'showtimes/:id/edit',
    loadComponent: () => import('./features/showtimes/edit-showtime/edit-showtime').then(m => m.EditShowtime),
    data: { title: 'Edit Showtime' },
  },
  {
    path: 'bookings',
    loadComponent: () => import('./features/bookings/bookings').then(m => m.Bookings),
    data: { title: 'Bookings' },
  },
  {
    path: 'payments',
    loadComponent: () => import('./features/payments/payments').then(m => m.Payments),
    data: { title: 'Payments' },
  },
  {
    path: 'reports',
    loadComponent: () => import('./features/reports/reports').then(m => m.Reports),
    data: { title: 'Reports' },
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings').then(m => m.Settings),
    data: { title: 'Settings' },
  },

  { path: '**', redirectTo: 'dashboard' },
];
