import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Kid } from '../model/Kid';
import { ModalAddKidPage } from '../pages/modal-add-kid/modal-add-kid.page';
import { ModalEditKidPage } from '../pages/modal-edit-kid/modal-edit-kid.page';
import { AuthService } from '../services/auth.service';
import { KidService } from '../services/kid.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users:any
  searchedUser:any;
  person:Kid
  kids:Kid[]=[]
  gender: boolean = true
  constructor(private apiKid:KidService,public modalController:ModalController,private router:Router,private alert:AlertController,private authS:AuthService) {}

  /**
   * 
   */
  async ionViewDidEnter(){
    
    await this.getKids();
    this.searchedUser=this.kids;
    
    
  }
  /**
   * 
   */
  public async getKids(){
    this.kids=[];
    this.kids=await this.apiKid.getKid();

    
  }

  /**
   * 
   * @param kid 
   */

  public async deleteKid(kid:Kid){
   
    this.apiKid.deleteKid(kid);
  }


  /**
   * 
   * @param event 
   * 
   */

  public buscar(event){
    const text=event.target.value;
    this.searchedUser=this.kids;
    if(text && text.trim() != ''){
      this.searchedUser=this.searchedUser.filter((kid:Kid)=>{
        return (kid.name.toLowerCase().indexOf(text.toLowerCase()) > -1);

      })
    }
  }

  /**
   * 
   * @param kid 
   * @returns 
   */

  async openModal(kid:Kid){
    const modal = await this.modalController.create({
      component: ModalAddKidPage,
      componentProps: {
        'kid': kid
      }
    });
    //this.closeSliding();
    return await modal.present();
  }


  /**
   * 
   */
  async exit(){
    await this.router.navigate(['']);
  }

  /**
   * 
   * @param kid 
   * @returns 
   */

  async openModalEditKid(kid:Kid){
    const modal = await this.modalController.create({
      component: ModalEditKidPage,
      componentProps: {
        'kid': kid
      }
    });
    //this.closeSliding();
    return await modal.present();
  }


  public async logout(){
      
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Atencion', 
      subHeader: 'Cierre de Sesión',
      message: '¿Está seguro de que quiere salir?',
      buttons: [ {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
          //await this.miLoading.dismiss();
          console.log('cancelar');
          
         
          
        }
        
      }, {
        text: 'Aceptar',
        handler: async () => {
          try{
            await this.authS.logout();
            this.router.navigate(['']);
            console.log("usuario logout");
            
            
          }catch(err) {
            console.log(err);
            
          }}
      }]
    });
    
    await alert.present();
  }

}