import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast:ToastController) { }

  async presentToast(message:string,duration:number,position:any,color:string) {
    const toast = await this.toast.create({
      message: message,
      position:position,
      duration:duration,
      color:color
    });
    toast.present();
  }
}
