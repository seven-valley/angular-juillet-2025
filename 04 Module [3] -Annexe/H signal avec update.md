# signal avec update()

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