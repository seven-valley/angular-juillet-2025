import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  poids:string ='80';
  taille:string ='1.8';
  imc:string='';
  tranche='';
  objectif='';
  onCalcul():void{
    console.log(this.poids);
    console.log(this.taille);
    const valImc:number = parseFloat(this.poids) / (parseFloat(this.taille)*parseFloat(this.taille));
    if (valImc > 25){
      const poidsIdeal = 25 *parseFloat(this.taille) *parseFloat(this.taille);
      const kilo = poidsIdeal - parseFloat(this.poids);
      this.objectif= 'Objectif :'+poidsIdeal.toFixed(1)+' kg ('+kilo.toFixed(1)+'kg)'; 
    }
    this.imc = valImc.toFixed(1)
    if (valImc < 18.5){
      const poidsIdeal = 18.5 *parseFloat(this.taille) *parseFloat(this.taille);
      this.tranche= 'maigreur';
      const kilo = poidsIdeal - parseFloat(this.poids);
      this.objectif= 'Objectif :'+poidsIdeal.toFixed(1)+' kg (+'+kilo.toFixed(1)+'kg)'; 
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
  getClass():string{
    const valImc = parseFloat(this.imc);
    console.log(valImc);
    if (valImc < 18.5){
      return 'alert-danger';
    }else if(valImc < 25){// 18.5 < valImc < 25

      return 'alert-success';
    }else if(valImc < 30){
      return 'alert-warning';
    }else if(valImc < 35){
      return 'alert-danger';
    }else if(valImc < 40){
      return 'alert-secondary';
    }
    return 'alert-primary';
    
    
  }
}
