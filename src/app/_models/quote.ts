import { Projects } from "./projects";

export class Quote {
  idQuote!: number;
  montant!: number;
  creationDate!: Date;
  expireDate!: Date;
  description!: string;
  projects?: Projects; // Assuming Projets is another entity
  //userClient: User;

  /*constructor(
    idQuote: number,
    montant: number,
    creationDate: Date,
    expireDate: Date,
    description: string,
    projects?: Projects // Assuming Projets is another entity
    //userClient: User
  ) {
    this.idQuote = idQuote;
    this.montant = montant;
    this.creationDate = creationDate;
    this.expireDate = expireDate;
    this.description = description;
    this.projects = projects;
    //this.userClient = userClient;
  }*/
}
