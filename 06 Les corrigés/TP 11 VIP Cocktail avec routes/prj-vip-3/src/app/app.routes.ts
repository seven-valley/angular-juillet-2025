import { Routes } from '@angular/router';
import { BuilderComponent } from './pages/builder/builder.component';
import { ModifierComponent } from './pages/modifier/modifier.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'builder', component: BuilderComponent },
    { path: 'modifier/:id', component: ModifierComponent }  
];
