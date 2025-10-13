import { Component } from '@angular/core';

import { NgFor } from '@angular/common';

import { Personne } from '../../models/personne';
import { PersonneService } from '../../services/personne.service';

@Component({
  selector: 'app-home',
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  personnes:Personne[]=[];
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
   getClass(status:boolean):string{
    if (status)
      return 'table-success';
    else
     return 'table-danger';
  }
}
