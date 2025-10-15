import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import Personne from './models/personne';
import PersonneService from '../services/personne.service';




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

  personnes:Personne[]= [
        { id: 42, prenom: "Brad", nom: "PITT" },
        { id: 23, prenom: "Nicolas", nom: "CAGE" },
        { id: 24, prenom: "Angelina", nom: "JOLIE" },
    ];
  ngOnInit(): void {
    
  }
  onAjouter():void{
    const p = {prenom:this.prenom(),nom:this.nom()};
    console.log(p);
  }
  onEnlever(i:number){
    console.log(i);
    console.log('enlever');
  }
  onModifier(i:number){
     console.log(i);
     console.log('modifier'); 
  }
}
