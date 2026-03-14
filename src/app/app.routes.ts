import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Users } from './features/users/users';
import { Movies } from './features/movies/movies';
import { Branches } from './features/branches/branches';
import { Showtimes } from './features/showtimes/showtimes';
import { Bookings } from './features/bookings/bookings';
import { Payments } from './features/payments/payments';
import { Reports } from './features/reports/reports';
import { Settings } from './features/settings/settings';


export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: Dashboard , data: { title: 'Dashboard' } },
    { path: 'users', component: Users , data: { title: 'Users' } },
    {path: 'branches', component: Branches , data: { title: 'Branches' } },
    { path: 'movies', component: Movies , data: { title: 'Movies' } },
    {path: 'showtimes', component:Showtimes, data: { title: 'Showtimes' } },
    {path: 'bookings' , component: Bookings, data: { title: 'Bookings' } },
    {path: 'payments' , component: Payments, data: { title: 'Payments' } },
    {path: 'reports' , component: Reports, data: { title: 'Reports' } },
    {path: 'settings' , component: Settings, data: { title: 'Settings' } },

    { path: '**', redirectTo: 'dashboard' }
];
