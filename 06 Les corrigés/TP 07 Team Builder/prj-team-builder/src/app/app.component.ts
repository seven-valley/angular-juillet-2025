import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EquipeComponent } from './equipe/equipe.component';
import { EntrepriseService } from './service/entreprise.service';
import { Entreprise} from './models/entreprise'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EquipeComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nomEquipe:string='';
  nomPersonne:string='';
  prenomPersonne:string='';
  equipeID:string='-1';
  entreprise:Entreprise = new Entreprise();
  personnesSubscription = new Subscription();

 constructor(private entrepriseService:EntrepriseService){}
 ngOnInit() {
  this.personnesSubscription =
    this.entrepriseService.entrepriseSubject.subscribe(
      (entreprise: any) => {
      this.entreprise = entreprise;
    });
  this.entrepriseService.loadPersonnes();
}
 onAjouterEquipe(){
  this.entrepriseService.ajouterEquipe(this.nomEquipe);
  this.nomEquipe = ''; // vider input
  
 }
 onAjouterPersonne(){
  
 this.entrepriseService.ajouterPersonne(this.prenomPersonne,this.nomPersonne,this.equipeID);
 this.nomPersonne = ''; // vider input
 this.prenomPersonne = ''; // vider input
 this.equipeID='-1';
}
onEnleverPersonne(indice:number){
  this.entrepriseService.enleverPersonne(indice);
}

}
