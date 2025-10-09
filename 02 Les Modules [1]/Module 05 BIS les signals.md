# Module 05 BIS les signals

# 1 - Introduction au signal

Création d'un signal  
<code> signal('abc')</code>

- Mettre à jour la vue sans "zone"
- <code>signal()</code> est une **fonction réactive** introduite dans Angular **16**.

- Elle crée un signal : une donnée **observable et réactive**, semblable à un <code>BehaviorSubject</code> mais **synchronisée et sans Observable**.

Ici, on crée un signal contenant la valeur initiale <code>'abc'</code>.

```ts
 title = signal('abc');
```

Ou bien
```ts
 title = signal<string>('abc');
``` 

**Ou bien**
```ts
protected readonly title:WritableSignal<string> = signal('abc');
```

**Pour l'afficher**
```html
<h1>{{ title() }}</h1>
```
title est une fonction qui s'abonne et qui se met à jours


**Pour le modifier**
```ts
this.title.set('Bonjour')
```

```ts
this.title.update(t => t +'??')
```

# 2 - Un formulaire complet avec signal

```ts
import { RouterOutlet } from '@angular/router';
import { Component, signal, computed, effect } from '@angular/core';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
// Signals pour les champs
  firstName = signal('');
  lastName = signal('');

  // Computed : se met à jour automatiquement
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`.trim());

  constructor() {
    // Effect : effet de bord, déclenché à chaque changement
    effect(() => {
      console.log('Nom complet changé →', this.fullName());
    });
  }
}
```

```html
 <h2>Formulaire avec computed et effect</h2>

    <label>
      Prénom :
      <input type="text" [value]="firstName()" (input)="firstName.set($any($event.target).value)" />
    </label>

    <label>
      Nom :
      <input type="text" [value]="lastName()" (input)="lastName.set($any($event.target).value)" />
    </label>

    <p><strong>Nom complet (computed) :</strong> {{ fullName() }}</p>
```
En Angular (et plus largement en TypeScript), **$any** est un cast spécial disponible uniquement dans les templates Angular.

## Définition

$any(expr) dit à Angular :  

"Considère expr comme étant de type any."  

C’est une façon de désactiver temporairement le typage strict dans un template.  


# 3- Autre exemple avec un compteur
Mise en place de <code>set()</code>
```ts
import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
// 🔹 signal = état réactif
  count = signal(0);

  // 🔹 computed = valeur dérivée
  double = computed(() => this.count() * 2);

  constructor() {
    // 🔹 effect = effet secondaire (écoute automatiquement les signaux utilisés)
    effect(() => {
      console.log('Le compteur a changé →', this.count());
    });
  }

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }
}
```

```html
  <div class="p-4">
      <h2>Compteur : {{ count() }}</h2>
      <h3>Valeur doublée (computed) : {{ double() }}</h3>

      <button (click)="increment()" class="px-3 py-1 bg-indigo-600 text-white rounded">
        +
      </button>
      <button (click)="decrement()" class="px-3 py-1 bg-gray-300 ml-2 rounded">
        -
      </button>
    </div>
```