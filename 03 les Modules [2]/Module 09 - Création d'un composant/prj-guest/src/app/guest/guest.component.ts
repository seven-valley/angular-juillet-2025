// on n'oublie pas ajoute Input dans les import
import { Component,Input } from '@angular/core';
import { Personne } from '../models/Personnes';
@Component({
  selector: 'app-guest',
  imports: [],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {
@Input() personne:Personne=new Personne();
@Input() indice:number=0;
}
