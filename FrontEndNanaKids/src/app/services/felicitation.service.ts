import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Felicitation } from '../model/Felicitation';

@Injectable({
  providedIn: 'root'
})
export class FelicitationService {
  constructor(private http:HttpClient) {   }

  public async getCount():Promise<Number[]>{
    let endpoint=environment.endpoint+environment.feliDaySearchByType+'1';
    let count:any=await this.http.get(endpoint,this.header).toPromise();
    return count;
  }

  public async getFelicitations():Promise<Felicitation[]>{
    let endpoint=environment.endpoint+environment.feliSearchByTypeAndDate+1;
    let felicitations:any=await this.http.get(endpoint,this.header).toPromise();
    return felicitations;
  }

  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
