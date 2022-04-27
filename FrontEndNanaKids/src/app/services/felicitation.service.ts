import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Felicitation } from '../model/Felicitation';
@Injectable({

  providedIn: 'root'

})
export class FelicitationService {
  constructor(private http:HttpClient) {}

  public async getCount():Promise<Number[]>{
    let endpoint=environment.endpoint+environment.feliCount;
    let count:any=await this.http.get(endpoint,this.header).toPromise();
    return count;
  }

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
    public async createFelicitation(fromData:any):Promise<Felicitation[]>{
    return new Promise(async (resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiFeli;
      try {
        let felicitation:Felicitation[]= await this.http.post(endpoint, fromData,).toPromise() as Felicitation[];
        resolve(felicitation);
      } catch (error) {
        reject(error);
      }
    });
  }
  public async updateFelicitation(fromData:any):Promise<Felicitation[]>{
    return new Promise (async (resolve,reject)=>{
      try {
        const endpoint = environment.endpoint+environment.apiFeli;
        let felicitation:Felicitation[]= await this.http.put(endpoint, fromData,).toPromise() as Felicitation[];
        resolve(felicitation);
      } catch (error) {
        reject(error);
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
