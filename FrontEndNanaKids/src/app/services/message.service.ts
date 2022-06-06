import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { messsage } from '../model/message';




@Injectable({
    providedIn: 'root'
  })
  export class MessageService {
  
    constructor(private http:HttpClient) { }
    //Se realizan llamadas a la api de la APP mediante la clase HttpClient

  /**
   * 
   * @param message
   * @returns Promise<messsage>, un POST del mensaje pasado por parametro (con sus respectivos datos) para enviarlo por whatsapp
   */

    public async sendMessage(message:messsage):Promise<messsage>{
        let endpoint=environment.endpoint+environment.sendMessage;
        return new Promise ((resolve,reject)=>{
          if(message){
            this.http.post(endpoint,message,this.header).toPromise().then(d=>{
              resolve(message);
            }).catch(err=> reject(err));
          }else{
            reject('No hay resultados')
          }
        });
      }

  /**
   * Header para controlar el acceso a la API y los CORS
  */
      private get header():any{
        return{
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json',
        }
      }
  }