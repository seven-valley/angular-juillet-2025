# Module B
Créer son propre pipe
```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})

export class ShortenPipe implements PipeTransform {
  transform(value: string): string {
    if (value.length <= 10) {
      return value;
    }
    return value.substring(0, 10) + '…';
  }
}
```

```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShortenPipe } from '../pipes/shorten.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet ,ShortenPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lorem  ipsum dole talat';
}
```

```html
<h1> {{ title | shorten}} </h1>
```