import { Entreprise} from '../models/entreprise';
import { Personne} from '../models/Personne';
export class EntrepriseService {
	/*
	entreprise:any = {
		tabEquipe: [],
		tabPersonne: []
	};
	*/
	entreprise = new Entreprise();
	deleteEquipe(i:number){
		this.entreprise.tabEquipe.splice(i,1);
	}
	ajouterPersonne(p:Personne){
		this.entreprise.tabPersonne.push(p);
	}
	ajouterPersonneEquipe(p:Personne,i:number){
		this.entreprise.tabEquipe[i].personnes.push(p);
	}
}