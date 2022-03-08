import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Admin } from '../model/Admin';
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
  public async login(email:string,password:string){
    try {
      const log = await this.afa.signInWithEmailAndPassword(email,password);
      if(log){
        this.user=log.user;
        await this.keepSession();
      }
    } catch (error) {
      
    }
  }

  

  public async logout(){
      await GoogleAuth.signOut(); 
      await this.storage.removeItem('user');
      this.user=undefined;
  }


  /**
   * 
   * @returns 
   */
  public async isLogged(){
    let user= await this.storage.getItem('user');
      if(user){
        user=JSON.parse(user);
        this.user=user;
      }else{
        console.log('nada');
        
      }
  }

  public async loadSession(){
    try {
      let user= await this.storage.getItem('user');
      if(user){
        user=JSON.parse(user);
        this.user=user;
      }
    } catch (error) {
      console.log("Error al cargar ---> "+error);
    }
  }
}

