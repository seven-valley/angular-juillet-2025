import { Appareil } from "../models/appareils";

export class AppareilService{
    appareils:Appareil[]=[];
    ajouter(a:Appareil){
        this.appareils.push(a);
    }
    switchAll(status:boolean){
        this.appareils.map(a => a.status=status);
    }
    switchOne(i:number){
        this.appareils[i].status = ! this.appareils[i].status;
    }
}