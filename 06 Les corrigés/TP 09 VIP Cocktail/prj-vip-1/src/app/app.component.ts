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
