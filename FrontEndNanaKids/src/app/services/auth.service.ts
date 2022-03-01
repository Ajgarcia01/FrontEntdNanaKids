import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:any;
  constructor(private afa:AngularFireAuth,private storage:StorageService) { }

  /**
   * 
   */
  public async keepSession(){
    await this.storage.setItem('user',JSON.stringify(this.user));
  }

  /**
   * 
   * @param email 
   * @param password 
   */
  public async loginwithEmail(email:string,password:string){
    try {
     const user= this.afa.signInWithEmailAndPassword(email,password);
     if(user){
      await this.keepSession(); 
      return this.afa.signInWithEmailAndPassword(email,password);
       
     }
    
    } catch (error) {
      console.log("Error al iniciar sesion ---> "+error);
    }
    
  }


  public async logout(){
    await this.afa.signOut()
    await this.storage.removeItem('user');
    this.user=null;
  }


  /**
   * 
   * @returns 
   */
  public isLogged():boolean{
    if(this.user) return true; else return false;
  }

}
