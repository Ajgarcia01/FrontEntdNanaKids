import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { messsage } from '../model/message';


@Injectable({
    providedIn: 'root'
  })
  export class MessageService {
  
    constructor(private http:HttpClient) { }


    public async sendMessage(message:messsage):Promise<messsage>{
        let endpoint="http://localhost:8100/"+environment.sendMessage;
        let send:any=await this.http.post(endpoint,message,this.header).toPromise();
        return send;
      }
      private get header():any{
        return{
          'Access-Control-Allow-Origin':'*',
          'Content-Type':'application/json',
        }
      }
  }