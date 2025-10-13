import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Personne } from '../models/personne';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PersonneService {
    personnes: Personne[] = [];
    url='https://alpha-javascript-default-rtdb.europe-west1.firebasedatabase.app/personnes.json';
    personneSubject = new Subject();
    constructor(private httpClient:HttpClient){}
    emitSubject() {
        this.personneSubject.next(this.personnes);
    }
    ajouter(p: Personne): void {
        this.personnes.push(p);
        this.saveFire();
    }
    enlever(i: number): void {
        this.saveFire();
    }
    loadFire(){
        this.httpClient.get<any[]>(this.url)
        .subscribe(
            (response)=>{
                if (response !=undefined){
                    this.personnes = response;
                }
                this.emitSubject();
            }
        );
    }
    saveFire(){
        this.httpClient.put(this.url,this.personnes)
        .subscribe(
            (response)=>{
               console.log(response)
               this.emitSubject();
            }
        );
    }
}
