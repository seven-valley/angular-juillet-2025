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
  calcul(f: NgForm) {
    console.log(f.value['litre'])
    console.log(f.value['km'])

    const consoVal = (parseFloat(f.value['litre']) * 100) / parseFloat(f.value['km'])
    this.conso = consoVal.toFixed(1);
    f.reset();
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
