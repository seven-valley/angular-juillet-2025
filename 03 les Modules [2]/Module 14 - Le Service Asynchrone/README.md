# Module 14 - Le Service Asynchrone

<img src="../../img/3-piments.png" width="200">

- Création d'un service asynchrone
- Le service devient Injectable
- Création d'un Observable
- La méthode emit
- L'envoie de données avec la méthode emit
- Abonnement aux données du service

## Un service Asynchrone : c'est quoi ?

Si notre service communique avec une API

- Nous devons attendre une réponse de l'API
- Et donc les données arriveront après le chargement du composant

---

Le Service va émettre un objet de type **subject**

- Un abonnement à un <code>subject</code> est nécessaire
- Avec l'objet <code>subscription</code> depuis le composant qui veut s'abonner

---

## Observer / Observable

un **Observable** est un objet qui **émet** des informations auxquelles on souhaite réagir.

- il "emet" un code qui sera exécuté à chaque fois que l'Observable émet une information
- Pour observer l'obserbable on utilise la fonction <code>subscribe()</code> :
- Grace à un objet de type <code>Subscription</code>

**Le service va emmètre un subject**

- Le composant va prendre un abonnement <code>subscription</code>  
  par exemple **_comparaison avec un abonnement à Sciences & vie_**

**services/personne.service.ts**

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PersonneService {
  //...
}
```

## :one: Création du subject

Nous allons créer un **subject**
**services/personne.service.ts**

```ts
import { Injectable } from "@angular/core";
// 1 importer
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PersonneService {
  // 2 création du subject
  personneSubject = new Subject();
}
```

## :two: Création de la méthode <code>emitSubject()</code>

Le <code>emitSubject()</code> permet d'emmetre la donnée  
C'est à dire envoyer la donnée en temps réel à chaque composant qui pnt souscrit un abonnement

**services/personne.service.ts**

```ts
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Personne } from "../models/personne";

@Injectable({
  providedIn: "root",
})
export class PersonneService {
  personnes: Personne[] = [];
  personneSubject = new Subject();
  //--------------------------------
  emitSubject() {
    this.personneSubject.next(this.personnes);
  }
  //--------------------------------
  // Nous allons garder les méthodes déjà créée
  ajouter(p: Personne): void {
    this.personnes.push(p);
    this.emitSubject();
  }
  enlever(i: number): void {
    this.personnes.splice(i, 1);
    this.emitSubject();
  }
}
```

## :three: Récupérer le service dans le component

Mise en place de l'abonnement dans le component principale  
avec la méthode <code>subscribe()</code>
**app.component.ts**

```ts
construct(private httpClient:HttpClient, private personneService:PersonneService)
//...
ngOnInit(): void {
    this.personneService.personneSubject.subscribe(
      (personnes:any)=>{
        this.personnes = personnes
      }
    )
 }
```

## :four: Mettre les requête Ajax Asynchrone

On ajoute la fonction <code>saveFire()</code>
**services/personne.service.ts**

```ts
//...
export class PersonneService {
  url =
    "https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/personnes.json";
  //...

  saveFire() {
    this.httpClient.put(this.url, this.personnes).subscribe((response) => {
      console.log(response);
      this.emitSubject();
    });
  }
}
```

## :five: On ajoute la fonction <code>LoadFire()</code>

Avec la fonction <code>emitSubject();</code>  
Elle enverra les données, une fois que firebase les aura envoyées

```ts
//...
export class PersonneService {
  //...
  loadFire() {
    this.httpClient.get<any[]>(this.url).subscribe((response) => {
      if (response != undefined) {
        this.personnes = response;
      }
      this.emitSubject();
    });
  }
  //...
}
```

## :six: On ajoute appelle <code>LoadFire()</code> dans le composant

**app.component.ts**

```ts
 ngOnInit(): void {
    this.personneService.personneSubject.subscribe(
      (personnes:any)=>{
        this.personnes = personnes
      }
    );
    //------------------------------------
    this.personneService.loadFire()  // on ajoute le chargement
    //------------------------------------
 }
```

# le service complet

**services/personne.service.ts**

```ts
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Personne } from "../models/personne";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PersonneService {
  personnes: Personne[] = [];
  url =
    "https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/personnes.json";
  personneSubject = new Subject();
  constructor(private httpClient: HttpClient) {}
  emitSubject() {
    this.personneSubject.next(this.personnes);
  }
  ajouter(p: Personne): void {
    this.personnes.push(p);
    this.saveFire();
  }
  enlever(i: number): void {
    this.saveFire();
  }
  loadFire() {
    this.httpClient.get<any[]>(this.url).subscribe((response) => {
      if (response != undefined) {
        this.personnes = response;
      }
      this.emitSubject();
    });
  }
  saveFire() {
    this.httpClient.put(this.url, this.personnes).subscribe((response) => {
      console.log(response);
      this.emitSubject();
    });
  }
}
```


# Le service avec signal
**personne.service.ts**
```ts
import { inject, Injectable, signal } from '@angular/core';
import { Personne } from '../models/personne';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonneService {
  //personneSubject = new Subject();
   httpClient = inject(HttpClient);
  url ='https://ib-vip-nantes-default-rtdb.europe-west1.firebasedatabase.app/user.json';
   personnes= signal<Personne[]>([]);

  ajouter(personne: Personne): void {
    const tab =this.personnes()
    tab.push(personne)
    this.personnes.set(tab)
    this.saveFire();
  }
  enlever(indice: number): void {
    const tab =this.personnes()
   
    tab.splice(indice, 1);
    this.personnes.set(tab)
    this.saveFire();
  }
  saveFire() {
    this.httpClient.put(this.url, this.personnes()).subscribe((response) => {
      console.log(response);
     // this.emitPersonneSubject();
    });
  }
  loadFire() {
    this.httpClient.get<any[]>(this.url).subscribe((response) => {
      if (response != undefined) {
        this.personnes.set(response);
      }
      //this.emitPersonneSubject();
    });
  }
}
```

**personne.service.ts**
```ts
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { CommonModule } from '@angular/common';
import { Personne } from './models/personne';
import { PersonneService } from './services/personne.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GuestComponent,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

 // private personneService;
  personneService = inject(PersonneService);
 personnes:Personne[]=this.personneService.personnes() ;


 ngOnInit(){
  this.personneService.loadFire()
  console.log(this.personnes)
 }
 ajouter(form:NgForm){
  const personne = new Personne(form.value['prenom'],form.value['nom']);
  form.reset()
  this.personneService.ajouter(personne)
 }

 
}
```

**app.component.ts**
```html

<form (ngSubmit)="ajouter(a)" #a="ngForm">
  <input type="text" name="prenom" placeholder="Prénom" ngModel>
  <input type="text" name="nom"  placeholder="Nom" ngModel>
  <button type="submit">Ajouter</button>
</form>

@for (personne of personneService.personnes(); track personne.id; let i = $index){

  <app-guest [personne]="personne"  [indice]="i" ></app-guest>
} 
```