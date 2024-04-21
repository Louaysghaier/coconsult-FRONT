import { Projects } from "./projects";

export class ProjFeed {
  idPjtFeed!: number;
  content!: string;
  timeUpd!: string;
  fctsUpd!: string;
  project: Projects = new Projects(); // Un seul projet
}
