import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Admin } from '../model/Admin';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user;
  constructor(private afa: AngularFireAuth, private storage: StorageService, private router: Router) { }

  /**
   * 
   */
  public async keepSession() {
    await this.storage.setItem('user', JSON.stringify(this.user));

  }

  /**
   * 
   * @param email 
   * @param password 
   */
  public async login(email: string, password: string) {
      await this.afa.signInWithEmailAndPassword(email, password).then(async (data) => {

        this.user = data.user;
        if (this.user != null) {
          await this.router.navigate(['private/tabs/tab1']);
          await this.keepSession();
        }

      }).catch((err) => console.log(err));

  }

  public async logout() {
    await this.afa.signOut();
    await this.storage.removeItem('user');
    this.user = null;
  }


  /**
   * 
   * @returns 
   */
  public async isLogged() {
    
    let user= await this.storage.getItem('user');
      if(user){
        user=JSON.parse(user);
        this.user=user;
      }
    if (this.user != null) {
      return true
    } else {
      return false;
    }
  }

  public async loadSession() {
    try {
      let user = await this.storage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.user = user;
      }
    } catch (error) {
      console.log("Error al cargar ---> " + error);
    }
  }
}

