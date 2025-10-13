# TP 09 Vip Cocktail
## :warning: La correction
<img src="../../img/tp/numero/c.webp" width="100">


# TP 09 Vip Cocktail

```ts
export class Personne{
    public id:string='';
    public status:boolean= false;
    constructor(public prenom?:string,public nom?:string){
    }
}
```


```ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Personne } from './models/personne';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  personnes: Personne[] = [];
  url: string = 'https://paris-vip-default-rtdb.europe-west1.firebasedatabase.app/';
  noeud = 'personne'
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    const url2 = `${this.url}${this.noeud}.json`;
    this.httpClient.get<any>(url2).subscribe(
      data => {
        console.log(data);
        const personnes = []
        for (let attribut in data) {
          const p = data[attribut];
          p.id = attribut
          personnes.push(p)
        }
        this.personnes = personnes
      }
    )
  }
  ajouter(f: NgForm) {
    const url2 = `${this.url}${this.noeud}.json`;
    const p = new Personne(f.value['prenom'], f.value['nom']);
    f.reset();
    this.httpClient.post<any>(url2, p).subscribe(
      (response) => {
        p.id = response.name;
        this.personnes.push(p);
      }
    );
  }
  onEnlever(i: number) {
    const id = this.personnes[i].id;
    const url2 = `${this.url}personne/${id}/.json`;
    this.httpClient.delete(url2).subscribe(
      data => {
        this.personnes.splice(i, 1)
      }
    )
  }
  onChanger(i: number) {
    const id = this.personnes[i].id;
    const url2 = `${this.url}personne/${id}/.json`;
    const p = {status:!this.personnes[i].status}
    this.httpClient.patch(url2,p).subscribe(
      data => {
        this.personnes[i].status = !this.personnes[i].status
      }
    )
  }
  getClass(status: boolean): string {
    if (status)
      return 'table-success';
    else
      return 'table-danger';
  }
}
```

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">
      <i class="fa-solid fa-martini-glass-citrus me-4"></i>
      VIP Cocktail</a
    >
  </div>
</nav>
<div class="container">
  <div class="row">
    <div class="col-8">
      <div class="bg-gris p-4">
        <form (ngSubmit)="ajouter(a)" #a="ngForm">
        <div class="row">
          <div class="col-4">
            <input
              aria-label="Prénom"
              class="form-control"
              placeholder="Prénom"
              name="prenom"
              ngModel
            />
          </div>
          <div class="col-4">
            <input
              aria-label="Nom"
              class="form-control"
              placeholder="Nom"
              name="nom"
              ngModel
            />
          </div>
          <div class="col-1">
            <button class="btn btn-success">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
      </form>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th colspan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr [class]="getClass(p.status)" *ngFor = "let p of personnes;index as i">
            <td>{{p.prenom}}</td>
            <td>{{p.nom}}</td>
            <td>
              <button class="btn btn-danger" (click)="onEnlever(i)">
                <i class="fa fa-trash"></i>
              </button>
            </td>
            <td>
              <button class="btn btn-warning" (click)="onChanger(i)">
                <i class="fa fa-check"></i>
              </button>
            </td>
          </tr>
         
        </tbody>
      </table>
    </div>

    <!-- col4 -->
  </div>
  <!-- row -->
</div>
<footer class="py-5 bg-dark">
  <div class="container px-4 px-lg-5">
    <p class="m-0 text-center text-white">
      Copyright &copy; Seven Valley 2024
    </p>
  </div>
</footer>


```