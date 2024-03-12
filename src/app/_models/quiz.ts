import { Question } from "./question";

  
export class Quiz{   
id_quiz!:number;
titre?:string;
dateQuiz?:Date;
description?:string;
questions?: Question[]; 
}