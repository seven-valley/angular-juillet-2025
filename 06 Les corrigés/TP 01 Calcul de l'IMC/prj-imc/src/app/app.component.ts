import { Component } from '@angular/core';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  poids:string ='80';
  taille:string ='1.8';
  imc:string='';
  tranche='';
  onCalcul():void{
    console.log(this.poids);
    console.log(this.taille);
    const valImc:number = parseFloat(this.poids) / (parseFloat(this.taille)*parseFloat(this.taille));
    this.imc = valImc.toFixed(1)
    if (valImc < 18.5){
      this.tranche= 'maigreur';
    }else if(valImc < 25){// 18.5 < valImc < 25
      this.tranche= 'normal';
    }else if(valImc < 30){
      this.tranche= 'surpoids';
    }else if(valImc < 35){
      this.tranche= 'obésité';
    }else if(valImc < 40){
      this.tranche= 'obésité massive';
    }else if(valImc > 40){
      this.tranche= 'obésité morbide';
    }
  }
}
