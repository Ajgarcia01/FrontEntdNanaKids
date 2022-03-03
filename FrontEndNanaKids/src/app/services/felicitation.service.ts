import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Felicitation } from '../model/Felicitation';
@Injectable({

  providedIn: 'root'

})
export class FelicitationService {

  constructor(private http:HttpClient) { }

  public async getFelicitations():Promise<Felicitation[]>{
    let endpoint=environment.endpoint+environment.apiFeli;
    let felicitations:any=await this.http.get(endpoint,this.header).toPromise();
    return felicitations;
  }

  public async getFelicitationsByType(type:number):Promise<Felicitation[]>{
    let endpoint = environment.endpoint+environment.feliSearchByType+type;
    let felicitations:any = await this.http.get(endpoint,this.header).toPromise();
    return felicitations;

  }
  public async deleteFelicitation(felicitation:Felicitation):Promise<void>{
    const id:any = felicitation.id ? felicitation.id:felicitation;
    const endpoint = environment.endpoint+environment.apiFeli+id;
    return new Promise ((resolve,reject) =>{
      this.http.delete(endpoint,this.header).toPromise()
      .then(d=>{
        resolve();
      }).catch(err=>reject(err));
    });
    }
    
    public createFelicitation(felicitation:Felicitation):Promise<void>{
      const endpoint = environment.endpoint+environment.apiFeli;
      return new Promise ((resolve,reject)=>{
        if(felicitation){
          this.http.post(endpoint,felicitation,this.header).toPromise().then(d=>{
            resolve();
            console.log(d);
          }).catch(err=> reject(err));
        }else{
          reject('No hay resultados')
        }
      });
    }
  
  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
