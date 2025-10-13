# TP 08 - Mes séries TV
## :warning: La correction
<img src="../../img/tp/numero/c.webp" width="100">


<img src="../../img/tp/tp7.webp" width="200">

```ts
import { CommonModule } from '@angular/common';
import { HttpClient,  } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  nom: string = "star";
  series: any[] = [];
  favs: any[] = [];

  constructor(private httpClient: HttpClient){

  }

  ngOnInit(){
    const data = localStorage.getItem('series');
    if(data){
      //console.log(JSON.parse(localStorage.getItem('films')!));
      this.favs = JSON.parse(data);
    }
  }

  onSaisieFilm(){
   
    let urlSaisie = "https://www.omdbapi.com/?apikey=3ce3673f&type=series&s=" + this.nom;
    this.httpClient.get(urlSaisie).subscribe(
      (response: any)=>{
        this.series = response.Search;
               
      }
    )
  }

  async onAjouterFilm(i: number){
    const f = await this.onRecupererNote(this.series[i].imdbID);
    this.favs.push(f);
    this.series.splice(i,1);
    localStorage.setItem('series', JSON.stringify(this.favs));
  }

  async onRecupererNote(id: string): Promise<string>
  {
    let urlFilm = "https://www.omdbapi.com/?apikey=3ce3673f&i=" + id;
    let  response:any = await firstValueFrom(this.httpClient.get(urlFilm));
    return response;
  }


  onDeleteFilm(indice:number){
    this.series.splice(indice,1);
    localStorage.setItem('series', JSON.stringify(this.favs));
  }
}

```

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">
        <i class="fa-solid fa-rocket me-4"></i>
        Mes séries</a
      >
    </div>
  </nav>
  <div class="container mt-4">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col-10">
            <input
              type="text"
              class="form-control"
              [(ngModel)]="nom"
              placeholder="Nom de la série"
            />
          </div>
          <div class="col-2">
            <button class="btn btn-success" (click)="onSaisieFilm()">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Séries</th>
              <th>Année</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let serie of series; index as i">
              <td>{{ serie.Title }}</td>
              <td>{{ serie.Year }}</td>
              <td>
                <img src="{{ serie.Poster }}" alt="{{ serie.Title }}" width="80" />
              </td>
              <td class="align-middle">
                <button
                  class="btn btn-outline-secondary"
                  (click)="onAjouterFilm(i)"
                >
                  <i class="fa fa-plus"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="offset-3 col-4">
        <h1>Séries à regarder :</h1>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Séries</th>
              <th>Année</th>
              <th>Rating</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let series of favs; index as i">
              <td>{{ series.Title }}</td>
              <td>{{ series.Year }}</td>
              <td>{{ series.imdbRating }}</td>
              <td>
                <img src="{{ series.Poster }}" alt="{{ series.Title }}" width="80" />
              </td>
              <td class="align-middle">
                <button class="btn btn-outline-danger" (click)="onDeleteFilm(i)">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <footer class="py-5 bg-dark">
    <div class="container px-4 px-lg-5">
      <p class="m-0 text-center text-white">Copyright &copy; Seven Valley 2023</p>
    </div>
  </footer>
  
```