import { Injectable } from "@angular/core";
import Personne from "../models/personne";

@Injectable({
    providedIn: "root",
})
export default class PersonneService {
    personnes: Personne[] = [];
    
}