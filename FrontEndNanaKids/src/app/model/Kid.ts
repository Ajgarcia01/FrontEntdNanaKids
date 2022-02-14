import { Felicitation } from "./Felicitation";
import { Parent } from "./Parent";

export interface Kid{
    birthDate:any,
    client:Parent[],
    felicitations:Felicitation[],
    gender:boolean,
    id?:number,
    name:string
}