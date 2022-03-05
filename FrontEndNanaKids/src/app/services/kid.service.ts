import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Kid } from '../model/Kid';

@Injectable({
  providedIn: 'root'
})
export class KidService {

  constructor(private http:HttpClient) { }


  public async getKid():Promise<Kid[]>{
    let endpoint=environment.endpoint+environment.apiKid;
    let kids:any=await this.http.get(endpoint,this.header).toPromise();
    return kids;
  }


  public deleteKid(kid:Kid):Promise<Kid>{
    const id:any= kid.id ? kid.id:kid;
    const endpoint = environment.endpoint+environment.apiKid+id;
    return new Promise ((resolve,reject)=>{
      this.http.delete(endpoint,this.header).toPromise()
      .then(d=>{
        console.log(d);
        resolve(kid);
      }).catch(err=>reject(err));
    });
  }

 


  public createKid(kid:Kid):Promise<Kid>{
    const endpoint = environment.endpoint+environment.apiKid;
    return new Promise ((resolve,reject)=>{
      if(kid){
        this.http.post(endpoint,kid,this.header).toPromise().then(d=>{
          resolve(kid);
          console.log(d);
        }).catch(err=> reject(err));
      }else{
        reject('No hay resultados')
      }
    });
  }


  public updateKid(kid:Kid):Promise<Kid>{
    const endpoint = environment.endpoint+environment.apiKid;
    return new Promise ((resolve,reject)=>{
      if(kid){
        this.http.put(endpoint,kid,this.header).toPromise().then(d=>{
          resolve(kid);
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
