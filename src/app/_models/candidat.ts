import { JobOpport } from "./jobopport";

export class Candidat {
    id_candidat?: number;
    email!: string;
    pdfFile?: string;
    jobOpport: JobOpport;
    }