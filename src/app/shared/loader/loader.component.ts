import { Component } from '@angular/core';
import { LoaderComponentVars } from './loader.component.vars';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  constructor(public loaderVars: LoaderComponentVars) { }
}
