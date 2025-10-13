import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  litre = '';
  km = '';
  conso = '';
  calcul() {
    if (this.litre.length>0 && this.km.length>0) {
      
    
    const consoVal = (parseFloat(this.litre) * 100) / parseFloat(this.km)
    this.conso = consoVal.toFixed(1);
    }
  }
  getClass() {
    if (parseFloat(this.conso) < 7) {
      return 'alert-success';
    }
    else if (parseFloat(this.conso) < 9) {
      return 'alert-warning';
    }
    else {
      return 'alert-danger';
    }
  }
}
