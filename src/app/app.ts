import { Component, inject, signal } from '@angular/core';
import { SideBar } from './layout/side-bar/side-bar';
import { TopBar } from './layout/top-bar/top-bar';
import { SidebarService } from './layout/sidebar.service';
import { Coontent } from './layout/coontent/coontent';


@Component({
  selector: 'app-root',
  imports: [SideBar, TopBar, Coontent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cinema-verse');
  protected readonly sidebarService = inject(SidebarService);
}
