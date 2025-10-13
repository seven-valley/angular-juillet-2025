# Module 10 - Mise en place d'un Service

 <img src="../../img/td/td10/2-piment.png" width="200">

 <img src="../../img/td/td10/5-screen.png" width="400">

:one: Pourquoi mettre en place un service ?  
:two: Création d'un service  
:three: Ajouter les méthodes pour modififier le tableau  
:four: Mettre le service dans les "provider"  
:five: Appeler le service depuis le composant principal

- Récupérer les données du service
- Modifier les données du service

:six: Appeler le service depuis un autre composant

## :one: Pourquoi mettre en place un service ?

- Partager les données
- Centraliser les données
- Une seule source à jour de vérité

---

$\color{red}{\text{SANS Le service}}$  
<img src="../../img/td/td10/1-avant.png" width="600">

---

$\color{green}{\text{AVEC Le Service}}$

- Le service contient désormais **le tableau** d'objets
  <img src="../../img/td/td10/2-apres.png" width="500">

---

Pour modifier les données :

- Chaque componsant appelle désormais **les méthodes** du service
  <img src="../../img/td/td10/3-apres.png" width="500">

---

## :two: Création du Service

Création du répertoires <code>services</code> dans le répertoire <code>app</code>

- Création du fichier <code>personne.service.ts</code>
  <img src="../../img/td/td10/4-service.png" width="200">

**personne.service.ts**

```ts
import { Personne } from "../../models/Personnes";

export class PersonneService {
  personnes: Personne[] = [
    { prenom: "Brad", nom: "PITT" },
    { prenom: "Nicolas", nom: "CAGE" },
    { prenom: "Angelina", nom: "JOLIE" },
  ];
}
```

## :three: Ajouter les méthodes pour modifier le tableau

- Dans le fichier TypeScript du component principal
- Le service est récupérer par injection de dépendance
- C'est-à-dire qu'il est instancier dans le constructeur
- Vérifier que le la classe du service est bien importée

**personne.service.ts**

```ts
import { Personne } from "../../models/Personnes";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:"root",
})
export class PersonneService {
  personnes: Personne[] = [
    { prenom: "Brad", nom: "PITT" },
    { prenom: "Nicolas", nom: "CAGE" },
    { prenom: "Angelina", nom: "JOLIE" },
  ];
  // les méthodes
  ajouter(p: Personne): void {
    this.personnes.push(p);
  }
  enlever(i: number): void {
    this.personnes.splice(i, 1);
  }
}
```

## :four: Ajouter le service en tant provider [optional]

**app.config.ts**

```ts
import { ApplicationConfig } from '@angular/core';
import { PersonneService } from './services/personne.
//...
export const appConfig: ApplicationConfig = {
  providers: [
    PersonneService
  ]
};
```

## :five: Appeler le service depuis le composant principal

**app.component.ts**

```ts
import { Component, OnInit } from "@angular/core";
import { PersonneService } from "./services/personne.service";
//..
export class AppComponent implements  {
  personnes: Personne[] = [];
 private personneService = inject(PersonneService);
 personnes:Personne[]=this.personneService.personnes;

  // ajouter la méthode pour ajouter ds le service
  ajouter(f: NgForm) {
    const p = new Personne(f.value["prenom"], f.value["nom"]);
    f.reset();
    this.personneService.ajouter(p);
  }
}
```

## :six: Appeler le service depuis un autre composant

**guest.component.ts**

```ts
export class GuestComponent {
personne = input.required<Personne>()  
indice = input.required<number>()  

 constructor(private personneService:PersonneService){
 }
 onEnlever(){
  this.personneService.enlever(this.indice())
 }
}
```

**guest.component.html**
```html
<p>{{personne().id}} -{{indice()}} {{personne().prenom}} {{personne().nom}}

    <button
    (click)="onEnlever()"
    class="btn btn-danger">del
        <i class="fa fa-trash"></i>
    </button>
</p>
