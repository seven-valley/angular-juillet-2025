import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Personne } from './models/personne';
import { PersonneService } from './services/personne.service';
import {NgForm,FormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgFor,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  personnes:Personne[]=[];
  // personneService
  constructor(private personneService:PersonneService){}
  
  ngOnInit(){
   // this.personnes = this.personneService.personnes;
   this.personneService.personneSubject.subscribe(
    (response:any)=>{
      this.personnes =response;
    }
    
   );
   this.personneService.loadFire();
  }
  ajouter(f:NgForm){
    const p = new Personne(f.value['prenom'],f.value['nom']);
    f.reset();
    // demander au service
    //this.personnes.push(p); 
    this.personneService.ajouter(p);  
  }
  onEnlever(i:number){
    this.personneService.enlever(i);
  }
  onChanger(i:number){
    this.personneService.changer(i);
  }
  getClass(status:boolean):string{
    if (status)
      return 'table-success';
    else
     return 'table-danger';
  }
}
