import { Felicitation } from "./Felicitation";
import { Parent } from "./Parent";

/*
*
* Classe Kid
*
*/

export interface Kid{
    birthDate:any, //Fecha
    client:Parent[], //Padres[]
    felicitations:Felicitation[], //Felicitaciones[]
    gender:boolean, //Género
    id?:number, //Id niñ@
    name:string //Nombre
}