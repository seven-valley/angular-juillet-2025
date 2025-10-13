import { Component } from '@angular/core';
import {  NgForm,FormsModule } from '@angular/forms';
import { GuestComponent } from './guest/guest.component';
import { NgFor } from '@angular/common';
import { Personne } from './models/Personnes';
@Component({
  selector: 'app-root',
  imports: [FormsModule,GuestComponent,NgFor],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
 personnes:Personne[] =[
  {prenom:'Brad',nom:'PITT'},
  {prenom:'Bruce',nom:'WILLIS'},
  {prenom:'Brad',nom:'PITT'},
 ];
}
