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
    this.favs.splice(indice,1);
    localStorage.setItem('series', JSON.stringify(this.favs));
  }
}
