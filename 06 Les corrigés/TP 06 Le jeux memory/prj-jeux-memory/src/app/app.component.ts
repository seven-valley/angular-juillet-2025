import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  tuiles: number[] = [];
  memo: number = -1;
  active: number = -1;
  win: number = 0;
  dateGame = new Date();
  ngOnInit() {
    let tab = [];
    for (let i = 0; i < 12; i++) {
      tab.push(i);
    }
    tab = this.melanger(tab);
    tab = tab.splice(0, 16);
    tab = tab.concat(tab);
    this.tuiles = this.melanger(tab);
  }
  melanger(tab: number[]) {
    let tab2 = [];
    for (let i = 0; i < tab.length; i++) {
      let x = 0;
      do {
        x = Math.floor(Math.random() * tab.length);
      } while (tab2[x] != undefined);
      tab2[x] = tab[i];
    }
    return tab2;
  }
  onVerifier(indice:number){
  
   if (this.memo == -1){
    this.memo = indice;
    this.active=indice;
   }else{
   
    // verifier que l'on ne clique pas sur la mm tuile
    if (this.memo != indice ){
      // si mm tuile
      if (this.tuiles[indice] == this.tuiles[this.memo]){
        // effacer les 2 tuiles
        this.tuiles[indice] = -1;
        this.tuiles[this.memo] = -1;
        this.win++;
      }
    }
    this.memo =-1;
    this.active=-1;
    const dateGame2 = new Date();

   }
  
   if (this.win==12){
    const dateGame2 = new Date();
    //Calcul le nombre de millisecondes
    const dif = (dateGame2.getTime() - this.dateGame.getTime())/1000 
     alert(dif);
   }
  }
}
