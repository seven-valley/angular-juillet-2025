import { Injectable } from "@angular/core";
import Appareil from "../../models/appareil";
@Injectable({
    providedIn: "root",
})
export default class AppareilService {
    appareils: Appareil[] = [
        { id: 42, name: 'TV', status: false },
        { id: 51, name: 'x box', status: true },
    ]
    ajouter(appareil: Appareil) {
        this.appareils.push(appareil);
    }
    switchAll(status: boolean) {
        this.appareils.map(a => a.status = status);
    }
    switchOne(indice: number) {
       this.appareils[indice].status =  ! this.appareils[indice].status;
       
    }
}