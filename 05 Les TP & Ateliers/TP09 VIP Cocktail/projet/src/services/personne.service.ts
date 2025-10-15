import { Injectable } from "@angular/core";
import Personne from "../app/models/personne";

@Injectable({
    providedIn: "root",
})
export default class PersonneService {
    personnes: Personne[] = [];
    
}