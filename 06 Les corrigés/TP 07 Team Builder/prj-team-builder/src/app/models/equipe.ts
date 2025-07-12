import {Personne} from './personne';
export class Equipe{
    personnes:Personne[] =[];
    constructor(public nom?:string,public id:string=''){
    }
}