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
    let endpoint=environment.endpoint+environment.apiKid;
    let kids:any=await this.http.get(endpoint,this.header).toPromise();
    return kids;
  }


  public deleteKid(kid:Kid):Promise<void>{
    const id:any= kid.id ? kid.id:kid;
    let endpoint = environment.endpoint+environment.apiKid+id;
    return new Promise ((resolve,reject)=>{
      this.http.delete(endpoint,this.header).toPromise()
      .then(d=>{
        resolve();
      }).catch(err=>reject(err));
    });
  }

  

  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
