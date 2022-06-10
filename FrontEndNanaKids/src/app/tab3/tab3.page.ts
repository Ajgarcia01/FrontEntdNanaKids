import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Felicitation } from '../model/Felicitation';
import { Kid } from '../model/Kid';
import { ModalAddFelicitationPage } from '../pages/modal-add-felicitation/modal-add-felicitation.page';
import { ModalEditFelicitationPage } from '../pages/modal-edit-felicitation/modal-edit-felicitation.page';
import { DataService } from '../services/data.service';
import { FelicitationService } from '../services/felicitation.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  felicitation: Felicitation  //Felicitación.
  felicitations: Felicitation[] = []  //Array de felicitaciones.

  optionSelected: number  //Opción seleccionada para buscar por tipo.
  /**
   * Estados de la felicitación.
   */
  enviado: string = "ENVIADO";
  noEnviado: string = "NO ENVIADO";

  /**
   * Tipo de  felicitación.
   */
  cumpleaños: string = "CUMPLEAÑOS";
  navidad: string = "NAVIDAD";

  nombre: string = "";
  miLoading: HTMLIonLoadingElement;

  constructor(private apiFelicitation: FelicitationService,
    public modalController: ModalController, private loading: LoadingController,
    public toast: ToastService, private alert: AlertController,private router:Router,private storage:StorageService,private data: DataService ) { }

  /**
   *  ->  Conversor de Estado <-
   * En función del estado de la felicitación, mostrara uno de los string definidos arriba.
   * @param felicitationEstado 
   * @returns 
   */
  conversorEstado(felicitationEstado: Felicitation): string {
    if (felicitationEstado.estate) {
      return this.enviado;
    } else {
      return this.noEnviado;
    }
  }

  /**
   *  ->  Conversor de Tipo <-
   * En función del tipo de la felicitación, mostrara uno de los string definidos arriba.
   * @param felicitationEstado 
   * @returns 
   */
  conversorTipo(felicitationEstado: Felicitation): string {
    if (felicitationEstado.type == 1) {
      return this.cumpleaños;
    } else if (felicitationEstado.type == 2) {
      return this.navidad;
    }
  }
  async ionViewDidEnter() {
    let user = await this.storage.getItem('user');
    if (user == null) {
      this.router.navigate(['']);

    }
    await this.getFelicitations();
  }

  /**
   *  ->  Metodo para mostrar felicitaciones por Tipo <-
   * Mostrar x felicitaciones en funcion del tipo seleccionado en la barra seleccionadora.
   * @param event 
   */
  public async recoverAlertValue(event: CustomEvent) {
    console.log(event.detail.value);
    this.optionSelected = event.detail.value;
    this.felicitations = [];

    if (this.optionSelected != 0) {
      this.felicitations = await this.apiFelicitation.getFelicitationsByType(this.optionSelected);
    } else {
      this.felicitations = await this.apiFelicitation.getFelicitations();
    }
  }

  /**
   * Obtener todas las felicitaciones.
   * @param event 
   */
  public async getFelicitations(event?) {
    if (!event) {
      await this.presentLoading();
    }
    this.felicitations = [];
    try {
      this.felicitations = await this.apiFelicitation.getFelicitations();

    } catch (err) {
      console.error(err);
      //await this.presentToast("Error cargando datos","danger",'bottom');
    } finally {
      if (event) {
        event.target.complete();
      } else {
        await this.miLoading.dismiss();
      }

    }
  }
  /**
   * 
   * -> Borra una felicitación  <-
   * Acciona el boton de borrar y hacer una llamada a la API (DELETE) y notifica con un Toast si todo ha ido bien
   * @param felicitation 
   */
  public async deleteFelicitation(felicitation: Felicitation) {
    const alert = await this.alert.create({
      header: 'Confirmación',
      message: 'Estas seguro de que quieres eliminar',
      buttons: [
        {
          text: 'Cancelar',
          handler: (blah) => {
            //nada
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.apiFelicitation.deleteFelicitation(felicitation);
              //Para recargar la lista
              let i = this.felicitations.indexOf(felicitation, 0);
              if (i > -1) {
                this.felicitations.splice(i, 1);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    });
    await alert.present();
    this.toast.presentToast("Felicitacion borrada con exito", 2000, "center", "danger");
  }

/**
   * 
   * -> Añadir felicitación  <-
   * Muestra un modal para introducir los paramentros de la felicitación.
   * @param felicitation 
   */
  async openCreateFelicitation(felicitation: Felicitation) {
    var modal = await this.modalController.create({
      component: ModalAddFelicitationPage,
      cssClass: 'trasparent-modal2',
      componentProps: {
        'felicitation': felicitation
      }
    });
    
     await modal.present();

    modal.onWillDismiss().then(async (data) => {
      
      if (data.data = true) {
        this.felicitations = await this.apiFelicitation.getFelicitations();
      }

    })


  }
  
  
  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: ''
    });
    await this.miLoading.present();
  }

/**
   * Exportamos a excel los datos que se encuentren en la base de datos.
   */
 exportToExcel() {
  this.data.exportToExcel(this.felicitations, 'Felicitaciones');
}
}
