#  rxRessource

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  http = inject(HttpClient);
  //constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
}

```

```ts
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: `
    <ng-container [ngSwitch]="usersResource.state()">
      <p *ngSwitchCase="'loading'"> Chargement...</p>
      <p *ngSwitchCase="'error'"> Erreur lors du chargement</p>
      <ul *ngSwitchCase="'success'">
        <li *ngFor="let user of usersResource.value()">
          {{ user.name }}
        </li>
      </ul>
    </ng-container>
  `
})
export class UsersComponent {
  private userService = inject(UserService);

  // Création de la ressource à partir de l'observable
  usersResource = rxResource({
    loader: () => this.userService.getUsers()
  });
}
```
Explications

rxResource prend un <code>loader</code> qui renvoie un Observable (ici HttpClient.get).

Il expose un objet avec :

<code>.state()</code> → <code>"loading" | "success" | "error"</code>

<code>.value()</code> → la donnée quand c’est en succès

<code>.error()</code> → l’erreur si ça a échoué

- C’est pratique pour gérer directement l’UI sans bricoler <code>subscribe</code> + <code>loading</code> + <code>catchError</code>.


- <code>rxResource()</code> → crée un signal enrichi qui gère <code>loading</code>, <code>error</code> et <code>success</code>.

# avec paramètre réactif ?

```ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
```

```ts
import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-detail',
  template: `
    <h3>Sélection utilisateur</h3>
    <select [value]="userId()" (change)="userId.set(+($event.target as HTMLSelectElement).value)">
      <option [value]="1">Utilisateur 1</option>
      <option [value]="2">Utilisateur 2</option>
      <option [value]="3">Utilisateur 3</option>
    </select>

    <ng-container [ngSwitch]="userResource.state()">
      <p *ngSwitchCase="'loading'"> Chargement...</p>
      <p *ngSwitchCase="'error'"> Erreur lors du chargement</p>
      <div *ngSwitchCase="'success'">
        <h4>{{ userResource.value()?.name }}</h4>
        <p>Email : {{ userResource.value()?.email }}</p>
      </div>
    </ng-container>
  `
})
export class UserDetailComponent {
  private userService = inject(UserService);

  // Paramètre réactif (signal)
  userId = signal(1);

  // rxResource dépend de userId
  userResource = rxResource({
    request: () => ({ id: this.userId() }), // paramètre réactif
    loader: ({ request }) => this.userService.getUserById(request.id)
  });
}

```

<code>userId</code> est un signal qui contient l’ID choisi.

<code>rxResource</code> surveille ce signal → dès que <code>userId</code> change, il relance automatiquement le <code>loader</code>.

<code>request</code> est un objet que vous définissez vous-même (ici <code>{ id: number }</code>).

<code>loader</code> reçoit ce <code>request</code> et retourne l’Observable.

Résultat : quand vous changez la valeur dans la <select>, <code>rxResource</code> recharge l’utilisateur correspondant.