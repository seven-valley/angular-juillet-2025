# Gestion des erreurs dans un formulaire
```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html'
})
export class MyFormComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.myForm.get('email');
  }

  get password() {
    return this.myForm.get('password');
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // Force affichage des erreurs
      return;
    }
    console.log(this.myForm.value)
     
  }
}
```

```html
<form [formGroup]="myForm" (ngSubmit)="submit()">

  <div>
    <label>Email</label>
    <input formControlName="email" type="email" />
    <div *ngIf="email?.touched && email?.invalid">
      <small *ngIf="email?.errors?.['required']">L'email est requis.</small>
      <small *ngIf="email?.errors?.['email']">Email invalide.</small>
    </div>
  </div>

  <div>
    <label>Mot de passe</label>
    <input formControlName="password" type="password" />
    <div *ngIf="password?.touched && password?.invalid">
      <small *ngIf="password?.errors?.['required']">Mot de passe requis.</small>
      <small *ngIf="password?.errors?.['minlength']">
        Mot de passe trop court (min 6 caractères).
      </small>
    </div>
  </div>

  <button type="submit">Envoyer</button>
</form>
```