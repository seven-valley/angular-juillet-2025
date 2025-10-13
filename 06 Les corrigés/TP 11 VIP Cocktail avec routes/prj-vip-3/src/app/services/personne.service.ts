import { Subject } from "rxjs";
import { Personne } from "../models/personne";
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonneService{
  constructor(private httpClient:HttpClient){}
    personneSubject = new Subject();
    url='https://paris-vip-default-rtdb.europe-west1.firebasedatabase.app/'
    noeud = 'client'
    private personnes:Personne[]=[]; 
    emitSubject(){
      this.personneSubject.next(this.personnes);
    }  
    loadFire(){
        this.httpClient.get<any[]>(`${this.url}${this.noeud}.json`).subscribe(
          (response)=> {
            this.personnes =[];
            if ( response != undefined)
              for (let id in response){
                const p = response[id];
                p.id =id;
                this.personnes.push(p)
              }
             this.emitSubject()
            }
        );
       
       } 
     ajouter(p:Personne):void{
     
      this.httpClient.post(`${this.url}${this.noeud}.json`,p).subscribe(
        (response:any)=> {
          console.log(response);
          p.id=response.name;
          this.personnes.push(p);
           this.emitSubject()
          }
      );
     
     }  
     enlever(i:number):void{
      const id = this.personnes[i].id;
      console.log(id)
      this.httpClient.delete(`${this.url}${this.noeud}/${id}/.json`).subscribe(
        (response:any)=> {
           this.personnes.splice(i,1);
           this.emitSubject()
          }
      );
     
     }  
     changer(i:number):void{
      const id = this.personnes[i].id;
      console.log(id)
      const obj ={status: !this.personnes[i].status}
      this.httpClient.patch(`${this.url}${this.noeud}/${id}/.json`,obj).subscribe(
        (response:any)=> {
          this.personnes[i].status =!this.personnes[i].status;
           this.emitSubject()
          }
      );
     }  
  

}