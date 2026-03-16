import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loader } from '../looder/loader';

@Component({
  selector: 'app-coontent',
  imports: [RouterOutlet, Loader],
  templateUrl: './coontent.html',
  styleUrl: './coontent.scss',
})
export class Coontent {

}
