// on n'oublie pas ajoute Input dans les import
import { Component,Input } from '@angular/core';
import { Personne } from '../models/Personne';
import { PersonneService } from '../services/personne.service';
@Component({
  selector: 'app-guest',
  imports: [],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})

export class GuestComponent {
constructor(private personneService:PersonneService){}
@Input() personne:Personne=new Personne();
@Input() indice:number=0;
  onEnlever() {
    this.personneService.enlever(this.indice);
  }
}
