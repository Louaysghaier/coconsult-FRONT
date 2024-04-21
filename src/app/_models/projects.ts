import { Assignements } from "./assignements";
import { Expanses } from "./expanses";

export class Projects {
    idProjet!: number;
  projetTitle!: string;
  budget: number=0;
  Mail!: string;
  dateDebut!: Date;
  dateFin!: Date;
  effectif: number=0;
  description!: string; // Renommez 'description' en 'descriptio'
  expanses?: Expanses[]; // Si Expanses est un autre modèle
  assignement?: Assignements[];

  }
  