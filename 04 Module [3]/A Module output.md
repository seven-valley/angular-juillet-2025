# les nouveau output

Voici un exemple précis et complet de @Output() dans Angular avec communication Parent → Enfant → Parent via un événement.

## Objectif
Créer un composant enfant avec un bouton, et lorsqu'on clique dessus, il émet un événement vers le parent avec une valeur.

**Enfant**
```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="notifyParent()">Clique ici</button>
  `,
  standalone: true
})
export class ChildComponent {
  @Output() notify = new EventEmitter<string>();

  notifyParent() {
    this.notify.emit('Bonjour du composant enfant !');
  }
}
```

**Parent**
```ts
import { Component } from '@angular/core';
import { ChildComponent } from './child.component'; // si standalone

@Component({
  selector: 'app-parent',
  template: `
    <app-child (notify)="onNotify($event)"></app-child>
    <p>Message de l'enfant : {{ message }}</p>
  `,
  standalone: true,
  imports: [ChildComponent]
})
export class ParentComponent {
  message = '';

  onNotify(message: string) {
    this.message = message;
  }
}

```

### Résultat attendu
- L'utilisateur clique sur le bouton dans le composant enfant.
- L’enfant déclenche l’événement <code>notify</code> avec un message.
- Le parent capte cet événement via <code>(notify)="onNotify($event)"</code> et met à jour l'affichage.


@Output() doit toujours être une instance de EventEmitter<T>

L’événement est émis avec .emit(value)

Le parent le capte via (eventName)="handler($event)"

## Rappel important
- <code>Output()</code> doit toujours être une instance de <code>EventEmitter<T></code>
- L’événement est émis avec <code>.emit(value)</code>
- Le parent le capte via <code>(eventName)="handler($event)"</code>