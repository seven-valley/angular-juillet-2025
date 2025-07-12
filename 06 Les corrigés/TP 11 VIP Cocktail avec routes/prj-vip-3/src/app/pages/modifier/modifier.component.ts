import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm,FormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-modifier',
  imports: [FormsModule],
  templateUrl: './modifier.component.html',
  styleUrl: './modifier.component.scss'
})
export class ModifierComponent {
  prenom:string='';
  nom:string='';
  id:any='';
  url='https://paris-vip-default-rtdb.europe-west1.firebasedatabase.app/'
  noeud = 'client'
constructor(private route:ActivatedRoute,private httpClient:HttpClient,private router:Router){}
ngOnInit(){
 
  this.id = this.route.snapshot.paramMap.get('id');
  this.httpClient.get(`${this.url}${this.noeud}/${this.id}/.json`).subscribe(
    (response:any)=> {
      console.log(response)
      this.prenom=response.prenom;
      this.nom=response.nom;
      }
  );

  }
  onModifier(){
    this.httpClient.patch(`${this.url}${this.noeud}/${this.id}/.json`,{prenom:this.prenom,nom:this.nom}).subscribe(
      (response:any)=> {
       console.log(response)
       this.router.navigate(['/builder']);
        }
    );
  }
}
