# Module 06 Mise en place d'un formulaire et Type Script

# basique
  
:warning: Pensez à importer <code>NgForm</code>
  
**app.component.ts**
```ts
import {NgForm,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
     onAjouter(form:NgForm){
       let nom = form.value['nom'];
       console.log(nom);
       form.reset();
     }  
}

```
**app.component.html**
```html
  <form (ngSubmit)="onAjouter(a)" #a="ngForm">
    <input name="nom" ngModel />
    <button type="submit">ajouter</button>
  </form>
```
# Un formulaire Complet
**app.component.ts**
```ts
export class AppComponent {

    defaultEquipe=2;
     onAjouter(form:NgForm){
       let nom = form.value['nom'];
       console.log(nom);
       let prenom = form.value['prenom'];
       console.log(prenom);
       let equipe = form.value['membre'];
       console.log(equipe);
       form.reset();
       form.controls['membre'].setValue(1);
     }  
}

```
**app.component.ts**
```html
  <form (ngSubmit)="onAjouter(a)" #a="ngForm">
    <input name="prenom" ngModel />
    <input name="nom" ngModel />
    <select [(ngModel)]="defaultEquipe" name="membre" ngModel>
      <option value="1">NON membre</option>
      <option value="2">Membre</option>
    </select>
    <button type="submit">ajouter</button>
  </form>
```

# Mise en place d'une classe Business Object

La documentation officielle
https://www.typescriptlang.org/fr/docs/handbook/2/classes.html

## Création Basique
```ts
class Personne {
  public nom: string;
  public age: number;

  constructor(nom: string, age: number) {
    this.nom = nom;
    this.age = age;
  }

  sePresenter(): void {
    console.log(`Bonjour, je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
  }
}
```
## Création avec l'implémentation unique avec une signature de surcharge

TypeScript permet d'écrire plus concis avec des modificateurs dans le constructeur :
```ts
class Voiture {
  constructor(public marque: string, public annee: number) {}
}
```

En TypeScript, on **ne** peut **pas** créer plusieurs constructeurs comme en Java (pas d’overloading classique).  
Mais on peut simuler plusieurs constructeurs en combinant :
- une signature de surcharge (overload)
- un unique constructeur réel avec de la logique conditionnelle

:white_check_mark: Exemple : Classe Personne avec plusieurs "constructeurs"
On veut pouvoir instancier une Personne :
- Soit avec un nom seulement
- Soit avec un nom et un âge

:mortar_board: Code TypeScript :
```ts

class Personne {
  nom: string;
  age?: number;

  // Signatures surchargées "overloading"  /!\ PAS POSSIBLE en Type Script /!\
  constructor(nom: string);
  constructor(nom: string, age: number);

// Alors voici comment on fait :)
  // Implémentation unique
  constructor(nom: string, age?: number) {
    this.nom = nom;
    if (age !== undefined) {
      this.age = age;
    }
  }

  sePresenter(): void {
    if (this.age !== undefined) {
      console.log(`Je m'appelle ${this.nom} et j'ai ${this.age} ans.`);
    } else {
      console.log(`Je m'appelle ${this.nom}.`);
    }
  }
}
```

:heart_eyes_cat: Utilisation :
```ts
const p1 = new Personne("Alice");
const p2 = new Personne("Bob", 30);

p1.sePresenter(); // Je m'appelle Alice.
p2.sePresenter(); // Je m'appelle Bob et j'ai 30 ans.
```
⚠️ **À retenir :**
- TypeScript permet de déclarer plusieurs signatures, mais il faut une seule implémentation dans le corps de la classe.
- Vous devez gérer manuellement la logique des cas (vérification de undefined, types, etc.)


-------

En TypeScript, les symboles <code>?</code> et <code>!</code> dans un constructeur ou dans une déclaration de propriété ont des **significations très différentes**, bien qu’ils soient souvent confondus.

# <code>?</code> (point d’interrogation) – Propriété optionnelle
Le symbole ? indique que la **propriété est optionnelle** : elle **peut exister ou non**.

```ts
class User {
  nom: string;
  age?: number; // optionnel

  constructor(nom: string, age?: number) {
    this.nom = nom;
    this.age = age;
  }
}
```
age peut être <code>undefined</code>.


Pas besoin de l’assigner obligatoirement dans le constructeur.
```ts
const u1 = new User("Alice");          // OK
const u2 = new User("Bob", 25);        // OK
```

## <code>!</code> (non-null assertion) – Suppression du contrôle d'initialisation
Le symbole ! indique à TypeScript que tu garantis toi-même que la propriété sera initialisée, même si le compilateur ne le voit pas.

```ts

class Product {
  name!: string; // TypeScript n'affichera pas d'erreur même si non initialisé ici
}
```
✅ Utilisation typique :
Pour éviter l'erreur Property 'name' has no initializer and is not definitely assigned.

⚠️ Attention :
Vous prenez la responsabilité d'initialiser cette propriété plus tard. Sinon, tu risques une erreur à l'exécution (undefined).



| Symbole | Signification                  | Valeur possible              | Initialisation requise ? |
| ------- | ------------------------------ | ---------------------------- | ------------------------ |
| `?`     | Propriété **optionnelle**      | Type ou `undefined`          | ❌ Non                    |
| `!`     | **Suppression** du contrôle TS | Tu affirmes qu'elle existera | ✅ Oui (à toi de gérer)   |
