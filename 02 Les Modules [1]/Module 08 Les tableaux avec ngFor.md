# Module 08 - Les tableaux avec ngFor
Les tableaux en JavaScript et TypeScript
    
<img src="../img/td/td8/frame2.jpg" width="200">
    
:warning: **Ne pas oublier d'importer ngFor**
## tableau simple
**app.component.ts**
```ts
// on importe NgFor
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-root',
  // on ajoute NgFor aux imports
  imports: [NgFor],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  tableau:string[] = ['pomme','poire','cerise'];
}
```

**app.component.html**
```html
<ul>
  <li *ngFor="let fruit of tableau;index as i">
    {{i}} {{fruit}}  
  </li>
</ul>
```

## tableau d'objet
**app.component.ts**
```ts
export class AppComponent {
  personnes:any[] =[
    {prenom:'Brad',nom:'PITT'},
    {prenom:'Nicolas',nom:'CAGE'}
    ];
}
```

**app.component.html**
```html
<table>
  <tbody>
    <tr *ngFor="let p of personnes;index as i">
      <td>{{i}}</td>
      <td>{{p.prenom}}</td>
      <td>{{p.nom}}</td>
    </tr>
  </tbody>
</table>
```

# Démo tableau objet Personnes

<code>Personne.ts</code>

```ts
export class Personne{
   constructor(public prenom?:string,public nom?:string, public age?:number){
    }
}
```


<code>app.components.ts</code>

```ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { Personne } from './models/Personne';


@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  personnes:Personne[] =[];

  // attribut
  onAjouter(form:NgForm):void{
    const nom = form.value['nom'];
    const prenom = form.value['prenom'];
    const p = new Personne(prenom,nom);
    this.personnes.push(p);
    form.reset();
  }
  onEffacer(indice:number):void{
    this.personnes.splice(indice,1);
  }
}



```

<code>app.components.html</code>

```html
<div class="container">

 <div class="col-4">
<form (ngSubmit)="onAjouter(b)" #b="ngForm">

  <input 
  placeholder="Prénom"
  class="form-control my-3" type="text" name="prenom" ngModel />
  <input 
  
  placeholder="Nom"
  class="form-control mb-3" type="text" name="nom" ngModel />
  
  <button 
  
  class="btn btn-primary" type="submit">
    <i class="fa fa-plus"></i>
  </button>
</form>  
</div> 
 <div class="col-5">
<!-- table>thead>tr>th*4 -->
<table class="table table-striped">
  <thead>
    <tr>
      <th>Indice</th>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Action</th>
    </tr>
  </thead>
  <!-- tbody>tr>td*4 -->
  <tbody>
   
    <tr *ngFor="let personne of personnes;index as indice">
      <td>{{indice }}</td>
      <td>{{ personne.prenom }}</td>
      <td>{{ personne.nom }}</td>
      <td><button 
        (click)="onEffacer(indice)"
        class="btn btn-danger">
        <i class="fa fa-trash"></i>
      </button> </td>
    </tr>
  </tbody>
</table>  
</div>
</div>

```