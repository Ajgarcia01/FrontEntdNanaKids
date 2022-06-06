import { Felicitation } from "./Felicitation";
import { Parent } from "./Parent";

/*
*
* Classe Message
*
*/


export interface messsage{
    message: string; //Mensaje
	urlImage: string; //Url de la imagen
	client: Parent[]; //Padres[]
	felicitation: Felicitation; //Felicitaciones[]
}