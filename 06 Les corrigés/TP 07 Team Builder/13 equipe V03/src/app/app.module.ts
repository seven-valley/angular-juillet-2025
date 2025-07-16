import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquipeComponent } from './equipe/equipe.component';
import { FormsModule } from '@angular/forms';
import { EntrepriseService} from './services/entreprise.service';
@NgModule({
  declarations: [
    AppComponent,
    EquipeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  EntrepriseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
