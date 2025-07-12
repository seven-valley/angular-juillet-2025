import { Component, OnInit } from '@angular/core';
import {  NgForm,FormsModule } from '@angular/forms';
import { GuestComponent } from './guest/guest.component';
import { NgFor } from '@angular/common';
import { Personne } from './models/Personne';

import { PersonneService } from './services/personne.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule,GuestComponent,NgFor],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
 personnes:Personne[] =[];
 prenom:string='';
 nom:string='';
 constructor(private personneService:PersonneService){}
 ngOnInit(): void {
    this.personnes = this.personneService.personnes;
 }

 ajouter(f:NgForm){
  const p = new Personne(f.value['prenom'],f.value['nom']);
  f.reset();
  this.personneService.ajouter(p);
 }
}
