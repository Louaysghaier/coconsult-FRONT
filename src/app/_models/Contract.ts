import { Etape } from "./EtapeContract";

export interface Contract {
    idContract?: number;
    description?: string;
    dateContract?: Date; 
    montant?: number;
    nbreTranche?: number;
    etape?: Etape;
    //payments?: any[]; 
    //project?: any; 
  } 