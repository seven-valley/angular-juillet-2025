import { Injectable } from '@angular/core';
import { Entreprise } from '../models/entreprise';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Personne } from '../models/personne';
import { Equipe } from '../models/equipe';

@Injectable({
  providedIn: 'root',
})
export class EntrepriseService {
  private url: string =
    'https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/';
  private noeudPersonne: string = 'personnes.json';
  private noeudEquipe: string = 'equipes.json';
  entreprise: Entreprise = new Entreprise();
  entrepriseSubject = new Subject();

  constructor(private httpClient: HttpClient) {}

  emitEntrepriseSubject() {
    this.entrepriseSubject.next(this.entreprise);
  }
  loadPersonnes() {
    this.httpClient
      .get<any>(this.url + this.noeudPersonne)
      .subscribe((response) => {
        for (let id in response) {
          let p = new Personne(response[id].prenom, response[id].nom, id);
          this.entreprise.personnes.push(p);
        }
        this.emitEntrepriseSubject();
      });
    this.httpClient
      .get<any>(this.url + this.noeudEquipe)
      .subscribe((response) => {
        for (let id in response) {
          let e = new Equipe(response[id].nom, id);
          if (response[id].personnes) {
            e.personnes = response[id].personnes;
          }
          this.entreprise.equipes.push(e);
        }
        this.emitEntrepriseSubject();
      });
  }
  ajouterEquipe(nom: string) {
    let equipe = new Equipe(nom);
    this.httpClient
      .post(this.url + this.noeudEquipe, equipe)
      .subscribe((response: any) => {
        equipe.id = response.name;
        this.entreprise.equipes.push(equipe);
        this.emitEntrepriseSubject();
      });
  }
  ajouterPersonne(prenom: string, nom: string, equipeID: string) {
    let personne = new Personne(prenom, nom);
    //let id ='';
    this.httpClient
      .post(this.url + this.noeudPersonne, personne)
      .subscribe((response: any) => {
        //id =response.name;
        personne.id = response.name;
        this.entreprise.personnes.push(personne);
        this.emitEntrepriseSubject();
        if (equipeID != '-1') {
          let obj = this.entreprise.equipes.find(
            (equipe) => equipe.id === equipeID
          );

          if (obj != undefined) {
            // si equipe est trouvé
            obj.personnes.push(personne);

            let equipePatch = { personnes: obj.personnes };
            this.httpClient
              .patch(this.url + 'equipes/' + equipeID + '.json', equipePatch)
              .subscribe((response: any) => {
                console.log(response);
                this.emitEntrepriseSubject();
              });
          }
        }
      });
  }
  ajouterPersonneEquipe2(personne:Personne, equipeID: string) {
          let obj = this.entreprise.equipes.find(
            (equipe) => equipe.id === equipeID
          );

          if (obj != undefined) {
            // si equipe est trouvé
            obj.personnes.push(personne);

            let equipePatch = { personnes: obj.personnes };
            this.httpClient
              .patch(this.url + 'equipes/' + equipeID + '.json', equipePatch)
              .subscribe((response: any) => {
                console.log(response);
                this.emitEntrepriseSubject();
              });
          }
  }
  enleverPersonneEquipe(equipeID: string, indicePersonne: number) {
    let objEquipe = this.entreprise.equipes.find(
      (equipe) => equipe.id === equipeID
    );
    if (objEquipe != undefined) {
      objEquipe.personnes.splice(indicePersonne, 1);

      let equipePatch = { personnes: objEquipe.personnes };
      this.httpClient
        .patch(this.url + 'equipes/' + equipeID + '.json', equipePatch)
        .subscribe((response: any) => {
          console.log(response);
          this.emitEntrepriseSubject();
        });
    }
  }
  enleverEquipe(equipeID: string) {
    let objEquipe = this.entreprise.equipes.find(
      (equipe) => equipe.id === equipeID
    );
    // ----
   let  index = this.entreprise.equipes.map(function(e) {
      return e.id
  }).indexOf(equipeID);
  
  this.entreprise.equipes.splice(index, 1);
    // ----
    if (objEquipe != undefined) {
      this.httpClient
        .delete(this.url + 'equipes/' + equipeID + '.json')
        .subscribe((response: any) => {
          this.emitEntrepriseSubject();
        });
    }
  }
  enleverPersonne(indicePersonne: number) {
    let id = this.entreprise.personnes[indicePersonne].id; 
    this.httpClient
        .delete(this.url + 'equipes/' + id + '.json')
        .subscribe((response: any) => {
          this.entreprise.personnes.splice(indicePersonne, 1);
          this.emitEntrepriseSubject();
        });
    
  }
}
