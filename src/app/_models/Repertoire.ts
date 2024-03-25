import { priorite } from "./priorite";
import { TypeContact } from "./typeContact";

export class Repertoire {

    idRepertoire !: number ; 
    contact !: String ; 
    numTel !: String ; 
    email !: String ;
    TypeContact !: TypeContact  ;
    Priorite !: priorite ; 

}