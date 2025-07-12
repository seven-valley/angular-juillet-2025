import { Component } from '@angular/core';
import { Router ,RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  myId =43;
  constructor(private router:Router){}
  onGo(){
    this.router.navigateByUrl('about');
  }
  onProduit(){
    this.router.navigate(['/produit', 33]);
  }
}
