import { Component, input } from '@angular/core';
import Appareil from '../../models/appareil';

@Component({
  selector: 'app-appareil',
  imports: [],
  templateUrl: './appareil.component.html',
  styleUrl: './appareil.component.scss'
})
export class AppareilComponent {
appareil = input<Appareil>()
indice = input<number>()

getClass():string{
  if (this.appareil()?.status){
    return 'list-group-item-success';
  }
  return 'list-group-item-danger'; 

}
}
