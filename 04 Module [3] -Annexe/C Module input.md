
**App.html**
```html
<div class="container">
  <form (submit)="onSubmit($event)">
  <input type="text" [value]="nom()" (input)="nom.set($event.target.value)" />
  <button type="submit">Envoyer</button>
</form>
  <button class="btn btn-primary"><i class="fa fa-plus"></i></button> 
  <h2>test</h2>
  @for (appareil of appareils; track appareil.id; let indice = $index) {
  <app-device 
  [appareil]="appareil" 
  [indice]="indice"
  (effacer)="effacer($event)"
  ></app-device>
  }
</div> 
```


**App.ts**
```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Device } from './device/device';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Device],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  nom = signal('');


onSubmit(event: Event) {
  event.preventDefault();
  this.appareils.push({name:this.nom(),status:true ,id:12})
  this.nom.set('')
}

  effacer(i:number){
    this.appareils.splice(i,1)
  }
  appareils: any[] = [
    {id:15, name:'tv', status:true},
    {id:16, name:'x-box', status:false},
      {id:17, name:'x-box 2', status:false},
  ];
}

```

**device.html**
```html
<p>device works! {{indice()}} {{appareil().name}}

     <button (click)="enlever()">effacer</button>
</p>
```

**device.ts**
```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-device',
  imports: [],
  templateUrl: './device.html',
  styleUrl: './device.scss'
})
export class Device {
 appareil = input<any>()
 indice = input<number>()
 effacer = output<number>()
 enlever(){
  this.effacer.emit(this.indice() ?? 0);
 }
}

```

