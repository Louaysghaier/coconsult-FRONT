import { Projects } from "./projects";

export class Quote {
  idQuote!: number;
  montant!: number;
  nom!:string;
  prenom!:string;
  creationDate!: Date;
  expireDate!: Date;
  description!: string;
  projects?: Projects; // Assuming Projets is another entity
  //userClient: User;
  valid: boolean = false;



}
