import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-produit',
  imports: [],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.scss'
})
export class ProduitComponent {
  constructor(private route:ActivatedRoute){}
  id:any=0;
 
  ngOnInit(){
    const id2= this.route.snapshot.paramMap.get('id');
    this.id =id2;
  }
  
}
