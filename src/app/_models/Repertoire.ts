import { priorite } from "./priorite";
import { TypeContact } from "./typeContact";

export interface Contract {

    idRepertoire ?: number ; 
    Contact ?: String ; 
    Numtel ?: String ; 
    email ?: String ;
    TypeContact ?: TypeContact  ;
    Priorite ?: priorite ; 

}