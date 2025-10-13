import {Personne} from './Personne';
import {Equipe} from './Equipe';

export class Entreprise {
	tabPersonne:Personne[];
	tabEquipe:Equipe[];
	constructor(){
		this.tabPersonne = [];
		this.tabEquipe =[];
	}
}