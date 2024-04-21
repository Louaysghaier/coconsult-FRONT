
export class SalesActivity {
    idActSale!: number;
    heureStart!: Date;
    heureEnd!: Date;
    description!: string;
    typeAct!: TypeSalesActivity;
    status!: Status;
  
}

export enum Status {
    DONE,
    WAITING
}
  

export enum TypeSalesActivity {
    REUNION ,
    APPEL_TELEPHONIQUE ,
    RESUME_APPEL ,
    MEETING ,
    CALL_SUMMARY 
  }