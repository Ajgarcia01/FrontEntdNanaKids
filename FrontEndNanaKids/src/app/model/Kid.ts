import { Greeting } from "./Greeting";
import { Parent } from "./Parent";

export interface Kid{
    birthDate:any,
    client:Parent[],
    felicitations:Greeting[],
    gender:boolean,
    id?:number,
    name:string
}