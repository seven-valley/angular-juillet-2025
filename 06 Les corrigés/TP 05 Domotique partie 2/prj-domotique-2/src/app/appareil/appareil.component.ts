import { Component, inject, input } from '@angular/core';
import Appareil from '../../models/appareil';
import AppareilService from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  imports: [],
  templateUrl: './appareil.component.html',
  styleUrl: './appareil.component.scss'
})
export class AppareilComponent {
  appareil = input.required<Appareil>()
  indice = input.required<number>()
  appareilService = inject(AppareilService);
  getClass(): string {
    if (this.appareil()?.status) {
      return 'list-group-item-success';
    }
    return 'list-group-item-danger';

  }
  onSwitchOne() {
    this.appareilService.switchOne(this.indice())
  }
}
