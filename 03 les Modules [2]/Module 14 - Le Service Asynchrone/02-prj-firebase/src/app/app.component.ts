import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private httpClient:HttpClient){}
  url='https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/client.json';
  url2='https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/';
  onAjouter(){
    const p = {nom:'Nicolas',prenom:'CAGE'};
    this.httpClient.post(this.url,p).subscribe(
      (response)=> {
         console.log(response)}
    );
  }
  onModifier(){
    const p = {status:false};
    this.httpClient.patch(`${this.url2}/personne/-OEOo3UC3x2EPx0dLST7/.json`,p).subscribe(
      (response)=> {
         console.log(response)}
    );
  }
  onLecture(){
   
    this.httpClient.get(this.url).subscribe(
      (response:any)=> {
        const personnes:any[] =[]
        for ( let id in response){
          console.log(id);
          console.log(response[id]) // response.id
          const p = response[id];
          p.id =id;
          personnes.push(p);
        }
        console.log(personnes);   
      }
    );
  }
  
}
