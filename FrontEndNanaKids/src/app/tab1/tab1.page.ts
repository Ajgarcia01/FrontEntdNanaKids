import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding, IonRefresher, LoadingController, ModalController } from '@ionic/angular';
import { Kid } from '../model/Kid';
import { ModalAddKidPage } from '../pages/modal-add-kid/modal-add-kid.page';
import { ModalEditKidPage } from '../pages/modal-edit-kid/modal-edit-kid.page';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { KidService } from '../services/kid.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  users:any //usuarios
  searchedUser:any; //usuario que se busca en la barra de busqueda
  person:Kid //modelo de niño
  kids:Kid[]=[] //array de niños
  gender: boolean = true //genero para las imagenes de niño o niña
  event:any //event para la barra de busqueda
  refresh:IonRefresher //IonRefresher
  miLoading:HTMLIonLoadingElement //loading
  
  /*
    IMAGENES CAMBIANTES
  */
  imagenKid:string  = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1652697573/images_kyxuoo.jpg";
  imagenNiño:string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1652696331/contento_sf932z.png";
  imagenNiña:string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1652696328/nina_xowlps.png";
  data: any;

 

  constructor(private apiKid:KidService,public modalController:ModalController,private router:Router,private alert:AlertController,private authS:AuthService,private kidService:KidService,
    private loading:LoadingController,private toast:ToastService,private storage:StorageService) {}
    
    
    /** 
    *
    * @param kid
    * @return la foto de perfil establecida en funcion del genero que se detecte
    * 
    */
    mostrarFoto(kid:Kid):string{
      if(kid.gender){
        return this.imagenNiño;
      }else if(!kid.gender){
        return this.imagenNiña;
      }else{
        return this.imagenKid;
      }
    }

  /*
    *
    * @return coge usuario del storage para ver si esta logueado y carga todos los niños
    * 
  */

   async ionViewDidEnter(){
    let user= await this.storage.getItem('user');
    if(user==null){
      this.router.navigate(['']);

    }
    
    await this.getKids();
    this.searchedUser=this.kids;
    
    
  }

  /*
    *
    * @return un excel con todos los datos de cada niño, con el nombre de 'Niños.xlsx' y con el array de niños que haya en la BBDD
    * 
  */
    exportToExcel() {
    this.data.exportToExcel(this.kids, 'Niños');
  }

   /**
    *
    * @param event
    * @return carga todos los niños de la BBDD, cargando con un loading y haciendo una llamada a la API (GET)
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

  /*
    * @return carga el loading y lo muestra en pantalla (se usa en todas las funciones que cargan datos) con un mensaje de cargando
    * 
  */
 
  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: 'CARGANDO'
    });
    await this.miLoading.present();
  }

  /**
   * 
   * @param event 
   * @return muestra aquellos niños que coincida con el texto pasadado por parametro en la barra de busqueda
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
   * @return muestra un modal con un formulario para añadir los datos del niño
   */

  async openModal(kid:Kid){
    const modal = await this.modalController.create({
      component: ModalAddKidPage,
      cssClass: 'trasparent-modal',
      componentProps: {
        'kid': kid
      }
    });
     await modal.present();

     modal.onWillDismiss().then(async (data) => {
      console.log(data.data)

      if (data.data = true) {
        this.searchedUser=await this.apiKid.getKid();
      }

    })
  }

  /**
   * 
   * @param kid 
   * @returns muestra un modal con un formulario para editar los datos del niño, pasando los datos de una pantalla a otra
   */

  async openModalEditKid(kid:Kid){
    const modal = await this.modalController.create({
      component: ModalEditKidPage,
      cssClass: 'trasparent-modal',
      componentProps: {
        'kid': kid
      }
    });
     await modal.present();
     
     modal.onWillDismiss().then(async (data) => {
      console.log(data.data)

      if (data.data = true) {
        this.searchedUser=await this.apiKid.getKid();
      }

    })
  }

  /**
   * 
   * @return un logout del usuario y redirige a la pagina de login
   */

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
          }catch(err) {
            console.log(err);
            
          }}
      }]
    });
    
    await alert.present();
  }

  /**
   * @param kid
   * @return acciona el boton de borrar y hacer una llamada a la API (DELETE) y notifica con un Toast si todo ha ido bien
   */

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
