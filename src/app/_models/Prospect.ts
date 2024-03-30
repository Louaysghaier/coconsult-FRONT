import { ProspectStatus } from "./ProspectStatus";

export class Prospect {
    idProspect !: number ; 
    
    name!: String ;  
    email !: String ; 
    Numtel !: String ;  
    status !: ProspectStatus ; 
}