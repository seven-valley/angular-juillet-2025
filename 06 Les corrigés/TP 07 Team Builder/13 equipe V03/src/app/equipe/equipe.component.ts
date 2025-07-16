import { Component, OnInit,Input } from '@angular/core';
import { Equipe} from '../models/Equipe';
import { EntrepriseService } from '../services/entreprise.service';
@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.scss']
})
export class EquipeComponent implements OnInit {
@Input() equipe:Equipe;
@Input() index:number;

  constructor(private entrepriseService:EntrepriseService) { }

  ngOnInit() {
  }
  onDeleteEquipe(){
  	this.entrepriseService.deleteEquipe(this.index);
  }

}
