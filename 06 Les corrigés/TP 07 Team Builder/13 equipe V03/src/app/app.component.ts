import { Component , OnInit} from '@angular/core';
import { Equipe } from './models/Equipe';
import { EntrepriseService} from './services/entreprise.service';
import { Entreprise } from './models/entreprise';
import { NgForm } from '@angular/forms';
import { Personne } from './models/Personne';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nomEquipe:string;
  entreprise:Entreprise;

  constructor(private entrepriseService:EntrepriseService){

  }
  ngOnInit(){
    this.entreprise = this.entrepriseService.entreprise;
  }
  onAjouterEquipe(){

  	let nom = this.nomEquipe;
  	this.nomEquipe=''; // je vide le champ input
  	let e = new Equipe(nom);
    this.entreprise.tabEquipe.push(e);
  	
  }
  onAjouterPersonne(form:NgForm){
    let nom     = form.value["nom"];
    let prenom   = form.value["prenom"];
    let i       = form.value["equipeIndex"];
    // j 'embauche la personne
    let p = new Personne(prenom,nom);
    this.entrepriseService.ajouterPersonne(p);
    if (i != -1){
        console.log('ok');
        // je met la personne ds 1 equipe
        this.entrepriseService.ajouterPersonneEquipe(p,i);
        console.log(this.entreprise);
        //this.entreprise.tabEquipe[i].personnes.push(p)
    }
  }
}
