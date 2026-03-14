import { Component, signal } from '@angular/core';
import { SideBar } from './layout/side-bar/side-bar';
import { TopBar } from './layout/top-bar/top-bar';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [ SideBar , TopBar , RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cinema-verse');
}
