import { Component, Input } from '@angular/core';
import { Appareil } from '../models/appareil';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appareil',
  imports: [CommonModule],
  templateUrl: './appareil.component.html',
  styleUrl: './appareil.component.scss'
})
export class AppareilComponent {
@Input() appareil:Appareil = new Appareil();
@Input() indice:number=0;

}
