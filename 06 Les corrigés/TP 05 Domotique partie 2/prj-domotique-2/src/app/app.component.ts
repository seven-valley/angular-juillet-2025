import { Component, inject, OnInit, signal } from '@angular/core';
import Appareil from '../models/appareil';
import { AppareilComponent } from './appareil/appareil.component';
import AppareilService from './services/appareil.service';


@Component({
  selector: 'app-root',
  imports: [AppareilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  nom = signal('');
  appareils:Appareil[]=[];
  appareilService = inject(AppareilService);
  ngOnInit(){
    this.appareils = this.appareilService.appareils;
  }
  onAjouter(){
    const appareil = new Appareil(new Date().getUTCMilliseconds(),this.nom())
    this.appareilService.ajouter(appareil);
    this.nom.set('');
  }
  onSwitchAll(status:boolean){
    this.appareilService.switchAll(status);
  }
}
