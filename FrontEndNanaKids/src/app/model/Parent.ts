import { Kid } from "./Kid";

export interface Parent{
    id?:number,
    name:string,
    dni:string,
    email:string,
    phone:string,
    surname:string,
    type:boolean,
    kids:Kid[],
}