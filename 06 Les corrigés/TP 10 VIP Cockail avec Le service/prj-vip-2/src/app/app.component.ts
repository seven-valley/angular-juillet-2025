import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Personne from './models/personne';
import PersonneService from './services/personne.service';





//import { RouterOutlet } from '@angular/router';

// décorateurs
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit  {
  prenom=signal('');
  nom=signal('');
  private personneService = inject(PersonneService);

  personnes:Personne[]= [];
  ngOnInit(): void {
     this.personneService.personneSubject.subscribe(
      (personnes:any)=>{
        this.personnes = personnes
        console.log(personnes);
      }
    )
    this.personneService.loadFire();

  }
  onAjouter():void{
    //const p:any = {prenom:this.prenom(),nom:this.nom()};
    const p = new Personne(this.prenom(),this.nom())
    //console.log(p);
    this.personneService.ajouter(p);
    this.prenom.set('');
    this.nom.set('');
  }
  onEnlever(i:number){
    this.personneService.effacer(i);
  }
  onModifier(i:number){
      this.personneService.modifier(i);
  }
}
