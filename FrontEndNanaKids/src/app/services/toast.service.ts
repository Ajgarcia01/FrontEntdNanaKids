import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast:ToastController) { }
  //Toast para mostrar mensajes de error y/o informacion en el frontend


/**
 * 
 * @param message: contenido del mensaje
 * @param duration: tiempo que se mostrara el mensaje
 * @param position: posicion del mensaje
 * @param color: color del mensaje
 * 
 * @returns Promise<void>, un toast con los parametros pasados por parametro
 */

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
