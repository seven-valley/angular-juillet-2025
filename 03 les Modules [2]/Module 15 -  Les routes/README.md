 # Module 15 - les routes
 <img src="../../img/route.webp" width="400">

https://angular.dev/guide/routing/common-router-tasks  
https://angular.fr/routeurs/creer-un-simple-routeur  
  
- Mise en place d'un router : définir les routes
- Mise en place du menu et du "router outlet"
- Naviguer sur une route
- Passer un paramètre à une route
- Récupérer le paramètre d'une route ex : **id**
- Naviguer sur une route avec un paramètre

## :one: Créations des pages
La page **Home**
```
ng g c home
```
La page **About**
```
ng g c about
```
La page **Produit**
```
ng g c produit
```

## :two: Mise en place du router
Dans <code>app.route.ts</code>
```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProduitComponent } from './produit/produit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'produit/:id', component: ProduitComponent },
  { path: '**', component: HomeComponent }
];
```

## :three: Le component principal devient :
**app.component.ts**
```ts
import { Component } from '@angular/core';
// 1 importer
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2 ajouter les imports
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

```
**app.component.html**
```html
<nav>
  <ul>
    <li><a 
      routerLink="/" 
      routerLinkActive="active" 
       [routerLinkActiveOptions]="{exact: true}"
     >Home</a></li>
    <li><a 
    routerLink="/about" 
    routerLinkActive="active"
    [routerLinkActiveOptions]="{exact: true}"
    >About</a></li>
  </ul>
</nav>
<router-outlet />
```


**app.component.scss**
```css
.active {
    color: red;
    font-weight: bold;
  }
```

## :four: La page Home


 **app.component.ts**
```ts
export class HomeComponent {
  myId =43;
  constructor(private router:Router){}
  onGo(){
    this.router.navigateByUrl('about');
  }
  onProduit(){
    this.router.navigate(['/produit', 33]);
  }
}
```

 **app.component.html**
```html
<h1>Home</h1>
<a routerLink="/about" >About</a>
<br> <br>
<a [routerLink]="['/produit', myId]">produit 43</a>
<br> <br>
<button (click)="onGo()">GO About</button>
<br> <br>
<button (click)="onProduit()">GO produit 33</button>
```

## :five: La page produit
 **produit.component.ts**
```ts
export class ProduitComponent {
  constructor(private route:ActivatedRoute){}
  id = this.route.snapshot.paramMap.get('id');
}
```
 **produit.component.html**
```html
<p>produit works!</p>
<h1>{{id}}</h1>
```