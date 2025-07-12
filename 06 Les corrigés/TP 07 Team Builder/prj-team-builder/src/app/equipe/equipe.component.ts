import { CommonModule } from '@angular/common';
import { Component,Input,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Equipe } from '../models/equipe';
import { Personne } from '../models/personne';
import { EntrepriseService } from '../service/entreprise.service';

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.css'
})
export class EquipeComponent implements OnInit {
@Input() equipe:Equipe = new Equipe();
@Input() indice:number=0;
@Input() personnes:Personne[]=[];
personnes2:Personne[]=[];
personneIndice:number=0;

  ngOnInit(){
  //  this.personnes2 = this.equipe.personnes.filter(item1 => !this.personnes.some(item2 => item1.id === item2.id));
  //  let tab = this.personnes.filter(p => this.equipe.personnes!.indexOf(p) < 0);
  //console.log(tab);
    //this.personnes2=this.personnes;
  }
  constructor(private entrepriseService:EntrepriseService){}
  getPersonnes(){
    return this.personnes.filter(p => this.equipe.personnes!.indexOf(p) < 0);
  }
  onEnleverPersonne(indicePersonne:number){
    this.entrepriseService.enleverPersonneEquipe(this.equipe.id,indicePersonne)
  }
  onEnleverEquipe(equipeID:string){
    this.entrepriseService.enleverEquipe(equipeID);
  }
  onAjouterPeronne(){
    this.entrepriseService.ajouterPersonneEquipe2(this.personnes[this.personneIndice],this.equipe.id);
  }

}
