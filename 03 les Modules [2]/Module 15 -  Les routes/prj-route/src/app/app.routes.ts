import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProduitComponent } from './produit/produit.component';

export const routes: Routes = [
    {path:'' ,component: HomeComponent},
    {path:'about' ,component: AboutComponent},
    {path:'produit/:id' ,component: ProduitComponent},
    {path:'**' ,component: HomeComponent} // 404 
];
