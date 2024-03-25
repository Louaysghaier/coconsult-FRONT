import { Etape } from "./EtapeContract";
import { Repertoire } from "./Repertoire"; // Import Repertoire model if it exists

export class Contract {
    idContract!: number;
    description!: string;
    dateContract!: Date; 
    montant!: number;
    nbreTranche!: number;
    etape!: Etape;
    repertoire?: Repertoire; // Add repertoire property
    //payments?: any[]; 
    //project?: any; 
}
