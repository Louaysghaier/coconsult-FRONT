import { Projects } from "./projects";

export class TimeRecord {
  idTimeRec: number;
  budget: number;
  date: Date;
  duration: Date;
  description: string;
  projects: Projects;

  constructor(
    idTimeRec: number,
    budget: number,
    date: Date,
    duration: Date,
    description: string,
    projects: Projects
  ) {
    this.idTimeRec = idTimeRec;
    this.budget = budget;
    this.date = date;
    this.duration = duration;
    this.description = description;
    this.projects = projects;
  }
}
