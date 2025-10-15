import { inject, Injectable } from "@angular/core";
import Personne from "../models/personne";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export default class PersonneService {
    private http = inject(HttpClient);
    personnes: Personne[] = [];
    personneSubject = new Subject();
    url = 'https://ib-vip-cocktail-default-rtdb.europe-west1.firebasedatabase.app/';
    noeud = 'personnes';
    emitSubject() {
        this.personneSubject.next(this.personnes);
    }
    loadFire() {
        const url2 = `${this.url}${this.noeud}.json`
        this.http.get(url2).subscribe(
            (response: any) => {
                //console.log('abc');
                //console.log(response)
                const personnes2 = []
                for (let id in response) {
                    const personne = response[id];
                    personne.id = id;
                    personnes2.push(personne);
                }
                this.personnes = personnes2;
                // console.table(this.personnes)
                this.emitSubject();
            }
        )

    }
    ajouter(p: Personne): void {
        const url2 = `${this.url}${this.noeud}.json`
        this.http.post(url2, p).subscribe(
            (response: any) => {
                console.log(response)
                p.id = response.name; // attribut l id de fire
                this.personnes.push(p);
                this.emitSubject();
            } // name:'-vcjv8585'
        )
    }
    effacer(i:number): void {
        const id = this.personnes[i].id;
        const url2 = `${this.url}${this.noeud}/${id}.json`
        this.http.delete(url2).subscribe(
            (response: any) => {
            this.personnes.splice(i,1);
            this.emitSubject(); 
            } // null
        )
    }
    modifier(i:number): void {
        const id = this.personnes[i].id;
        const url2 = `${this.url}${this.noeud}/${id}.json`
        const obj = {status: !this.personnes[i].status}
        this.http.patch(url2,obj).subscribe(
            (response: any) => {
            this.personnes[i].status =!this.personnes[i].status
            this.emitSubject();
            } // null
        )
    }
}