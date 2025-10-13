import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppareilComponent } from './appareil/appareil.component';
import { Appareil } from './models/appareils';
import { NgForm,FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { AppareilService } from './services/appareil.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AppareilComponent,FormsModule,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  nom:string='';
  appareils:Appareil[]=[];
  // appareilService
  constructor(private appareilService:AppareilService){}
  ngOnInit(){
    this.appareils = this.appareilService.appareils;
  }
  ajouter(f:NgForm){

    const a = new Appareil(f.value['nom'])
    console.log(a);
    f.reset();
   this.appareilService.ajouter(a);
  }
  onSwitch(status:boolean){
    this.appareilService.switchAll(status);
  }
}
