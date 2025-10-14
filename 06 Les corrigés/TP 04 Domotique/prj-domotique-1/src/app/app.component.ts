import { Component } from '@angular/core';
import Appareil from '../models/appareil';
import { AppareilComponent } from './appareil/appareil.component';


@Component({
  selector: 'app-root',
  imports: [AppareilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appareils:Appareil[]=[
    {id:42 , name:'TV',status:false},
    {id:51 , name:'x box',status:true},
  ]
}
