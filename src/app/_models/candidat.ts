import { JobOpport } from "./jobopport";

export class Candidat {
    id_candidat?: number;
    email!: string;
    nom!:String;
    pdfFile?: string;
    jobOpport: JobOpport;
    info!:string;
    competence!:string;
    }