import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, IonRefresher, LoadingController, ModalController } from '@ionic/angular';
import { Kid } from '../model/Kid';
import { ModalAddKidPage } from '../pages/modal-add-kid/modal-add-kid.page';
import { ModalEditKidPage } from '../pages/modal-edit-kid/modal-edit-kid.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { KidService } from '../services/kid.service';
import { ToastService } from '../services/toast.service';

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
  event:any
  refresh:IonRefresher
  miLoading:HTMLIonLoadingElement
  constructor(private apiKid:KidService,public modalController:ModalController,
    private router:Router,private alert:AlertController,
    private authS:AuthService,private kidService:KidService,private loading:LoadingController,private toast:ToastService,private data:DataService) {}

  /**
   * 
   */
   async ionViewDidEnter(){
    
    await this.getKids();
    this.searchedUser=this.kids;
    
    
  }


    exportToExcel() {
    this.data.exportToExcel(this.kids, 'Niños');
  }

  /**
   * 
   */
  public async getKids(event?){
    if(!event){
      await this.presentLoading();
    }
    this.kids=[];
    try{
      this.kids=await this.apiKid.getKid();
    }catch(err){
      console.error(err);
    } finally{
      if(event){
        event.target.complete();
      }else{
        await this.miLoading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: 'CARGANDO'
    });
    await this.miLoading.present();
  }

  /**
   * 
   * @param kid 
   */

  public async deleteKid(kid:Kid){
   
    this.apiKid.deleteKid(kid);
    await this.getKids();
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
      cssClass: 'trasparent-modal',
      componentProps: {
        'kid': kid
      }
    });
    //this.closeSliding();
    return await modal.present();
  }

  /**
   * 
   * @param kid 
   * @returns 
   */

  async openModalEditKid(kid:Kid){
    const modal = await this.modalController.create({
      component: ModalEditKidPage,
      cssClass: 'trasparent-modal',
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


  public async borrar(kid:Kid){
  
      const alert = await this.alert.create({
        cssClass: 'my-custom-class',
        header: 'Atencion', 
        subHeader: 'Eliminado de niño',
        message: '¿Está seguro de que quiere eliminar?',
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
              await this.kidService.deleteKid(kid);
              let i = this.kids.indexOf(kid,0);
              if(i>-1){
                this.kids.splice(i,1);
              }
              this.toast.presentToast("Niño borrado con exito",2000,"center","danger");
            }catch(err) {
              console.log(err);
              
            }}
        }]
      });
      
      await alert.present();
    }

  }
