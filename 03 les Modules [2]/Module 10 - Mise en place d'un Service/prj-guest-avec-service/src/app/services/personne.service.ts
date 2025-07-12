import { Personne } from "../models/Personne";

export class PersonneService {
    personnes:Personne[]=[
        {prenom:'Brad',nom:'PITT'},
        {prenom:'Nicolas',nom:'CAGE'},
        {prenom:'Angelina',nom:'JOLIE'},
    ];
    ajouter(p:Personne):void{
        this.personnes.push(p)
    }
    enlever(i:number):void{
        this.personnes.splice(i,1);
    }
}