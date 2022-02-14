import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Kid } from '../model/Kid';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http:HttpClient) { }

  public async getKid():Promise<Kid[]>{
    let endpoint=environment.endpoint+environment.apiItem;
    let kids:any=await this.http.get(endpoint,this.header).toPromise();
    return kids;
  }

  

  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
