import {Personne} from './Personne';
export class Equipe{
	personnes:Personne[];
	constructor(
		public nom:string,
		public id?:number){
		this.personnes =[];
	}
}