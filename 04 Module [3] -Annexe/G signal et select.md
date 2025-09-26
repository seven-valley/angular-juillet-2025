# Mise en place d'un menu déroulant avec signal

```ts
export class AppComponent {
 country: WritableSignal<string> = signal('fr');
 afficher(e:Event){
  e.preventDefault();
  console.log(this.country())
  this.country.set('al')
 }
}
```

```html
<div class="p-4">
   
  <form (submit)="afficher($event)">
    <select 
    
    [value]="country()" (input)="country.set($any($event.target).value)"
    > 
        <option value="fr">
            france
        </option>
        <option value="al">
            allemagne
        </option>

    </select>
    <button type="submit">GO</button>
  </form>
  </div>
  ```