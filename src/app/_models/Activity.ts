export class Activity {
    idActivity! : number;
    nbreOfTask! :number;
    taskType! :ActivityType;
    

}

export enum ActivityType{
    Security = 'Security',
    DevpWeb = 'DevpWeb',
    devMobile = 'devMobile',
    Gamix = 'Gamix',
    BAnking = 'BAnking',
    AIorBI = 'AIorBI',
    Emprque = 'Emprque',
    Datasc = 'Datasc',
    CloudComp = 'CloudComp',
}