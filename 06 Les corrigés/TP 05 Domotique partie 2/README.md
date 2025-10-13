# TP Delta Domotique PARTIE 2
## :warning: La correction
<img src="../../img/tp/numero/c.webp" width="100">

**live preview** :  
[Tester le TP Delta](https://www.sevenvalley.fr/tp-javascript/tpd)
  
  <img src="../../img/tp/tpd.webp" width="200">


<code>app.config.ts</code>

```ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppareilService } from './services/appareil.service';

export const appConfig: ApplicationConfig = {
  providers: [
    AppareilService,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)]
};

```


<code>models/apppareil.ts</code>

```ts
import { Appareil } from "../models/appareils";

export class AppareilService{
    appareils:Appareil[]=[];
    ajouter(a:Appareil){
        this.appareils.push(a);
    }
    switchAll(status:boolean){
        this.appareils.map(a => a.status=status);
    }
    switchOne(i:number){
        this.appareils[i].status = ! this.appareils[i].status;
    }
}
```

<code>app.component.html</code>

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">
      <i class="fa-solid fa-tv me-3"></i>
      Domotique</a>
  </div>
</nav>
<div class="container mb-3">
  <div class="row">
    <div class="col-4">
      <h2>Les Appareils</h2>
      <form (ngSubmit)="ajouter(a)" #a="ngForm">

      <input name="nom"  class="form-control" placeholder="Appareil" ngModel />

      <button class="btn btn-secondary my-3" type="submit">
        <i class="fa fa-plus"></i>
      </button>
    </form>

      <ul class="list-group">
        <app-appareil 
        *ngFor="let a of appareils;index as i"
        [appareil]="a"
        [indice]="i"
        ></app-appareil>
      </ul>
      <br />
      <button (click)="onSwitch(true)" class="btn btn-success">ALL ON</button>

      <button (click)="onSwitch(false)" class="ms-3 ml-2 btn btn-danger">ALL OFF</button>
    </div>
  </div>
</div>
<footer class="py-5 bg-dark">
  <div class="container px-4 px-lg-5">
    <p class="m-0 text-center text-white">
      Copyright &copy; Seven Valley 2024
    </p>
  </div>
</footer>
```

<code>app.component.ts</code>

```ts
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

```

<code>appareil.component.html</code>

```html
<li class="list-group-item"
 [ngClass]="{
  'list-group-item-success' : appareil.status,
  'list-group-item-danger' : appareil.status==false,
  }">
    <h4>{{appareil.name}} </h4>

    <button *ngIf="appareil.status == false" button (click)="onSwitch()" class="btn btn-success">ON</button>

    <button *ngIf="appareil.status" (click)="onSwitch()" class="ms-3 ml-2 btn btn-danger">OFF</button>
  </li>

```

<code>appareil.component.ts</code>

```ts
import { Component, Input } from '@angular/core';
import { Appareil } from '../models/appareils';
import { CommonModule } from '@angular/common';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  imports: [CommonModule],
  templateUrl: './appareil.component.html',
  styleUrl: './appareil.component.scss'
})
export class AppareilComponent {
  @Input() appareil = new Appareil();
  @Input() indice = 0;
  constructor(private appareilService: AppareilService) { }
  onSwitch() {
    this.appareilService.switchOne(this.indice);
  }
}


```
