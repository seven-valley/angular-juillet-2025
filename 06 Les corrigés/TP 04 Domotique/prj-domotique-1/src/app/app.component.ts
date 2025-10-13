import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Appareil } from './models/appareil';
import { AppareilComponent } from './appareil/appareil.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AppareilComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  appareils:Appareil[]=[];
  onAjouter(formAppareil:NgForm){
    console.log('ajout');
    const appareil = new Appareil(formAppareil.value['nom']);
    // vider le champ input
    this.appareils.push(appareil);
    formAppareil.reset();
    console.log(this.appareils);
  }
  onSwitch(status:boolean):void{
    // for ( let appareil of this.appareils){
    //   appareil.status = status
    // }
    this.appareils.map(appareil => appareil.status=status);
  }
}
