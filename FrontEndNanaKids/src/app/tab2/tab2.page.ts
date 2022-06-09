import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Parent } from '../model/Parent';
import { ModalAddParentPage } from '../pages/modal-add-parent/modal-add-parent.page';
import { ModalEditParentPage } from '../pages/modal-edit-parent/modal-edit-parent.page';
import { ClientService } from '../services/client.service';
import { StorageService } from '../services/storage.service';
import { DataService } from '../services/data.service';
import { ToastService } from '../services/toast.service';
import { async } from '@firebase/util';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  client: Parent
  clients: Parent[] = []
  gender: boolean = true
  searchedUser: any;
  miLoading: HTMLIonLoadingElement
  /*
      IMAGEN CAMBIANTE
    */
  imagenCliente: string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1652730991/padres_qkes3d.png";
  imagenPadre: string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1652731422/dad_aifb6d.png";
  imagenMadre: string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1652731422/mother_n9z4vq.png";
  constructor(private servicioClient: ClientService, private alertController: AlertController,
    public modalController: ModalController, private loading: LoadingController,
    private toast: ToastService, private storage: StorageService,
    private router: Router, private data: DataService) { }

    /**
     * Comprueba que hemos iniciado sesion en caso de no haber iniciado sesión nos vuelvo a la pantalla de login.
     * En caso de haber iniciado sesion nos devuelve un listado de todos los usuarios de nuestra base de datos
     */
  async ionViewDidEnter() {
    let user = await this.storage.getItem('user');
    if (user == null) {
      this.router.navigate(['']);

    }
    await this.getClients();
    this.searchedUser = this.clients;
  }

  /**
   * Imagen para mostrar en la lista dependiendo del genero del cliente
   */
  mostrarFoto(client: Parent): string {
    if (!client.type) {
      return this.imagenPadre;
    } else if (client.type) {
      return this.imagenMadre;
    } else {
      return this.imagenCliente;
    }
  }

/**
 * 
 * Obtiene todos los clientes de la base de datos mostrando un login
 */
  async getClients(event?) {
    if (!event) {
      await this.presentLoading();
    }
    this.clients = [];
    try {
      this.clients = await this.servicioClient.getClient();
    } catch (err) {
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
   * Loading para cargar los datos de la base de datos
   */
  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: ''
    });
    await this.miLoading.present();
  }

  /**
   * 
   * @param client Cliente que recogemos por parametros
   * 
   * Buscamos un cliente por su ID en la base de datos a través de datos que hemos recibido por parametro
   */
  async getclientsid(client: Parent) {
    this.client = await this.servicioClient.GetClientByID(client.id);
    console.log(this.client);
  }

  /**
   * 
   * @param client Cliente selecciona en la lista
   * Elimina el cliente seleccionado de la lista en la base de datos
   */
  public async DeleteClient(client: Parent) {

    const alert = await this.alertController.create({
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
              await this.servicioClient.DeleteClient(client.id);
              console.log(client);
              //Para recargar la lista
              let i = this.clients.indexOf(client, 0);
              if (i > -1) {
                this.clients.splice(i, 1);
              }
              this.toast.presentToast("Cliente borrado con exito", 2000, "center", "danger");
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 
   * Buscador que filtra a través del nombre
   */
  public buscar(event) {
    console.log(event);
    const text = event.target.value;
    this.searchedUser = this.clients;
    if (text && text.trim() != '') {
      this.searchedUser = this.searchedUser.filter((client: Parent) => {
        return (client.name.toLowerCase().indexOf(text.toLowerCase()) > -1);

      })

    }
  }

  /**
   * 
   * Modal que lo utilizamos para añadir un cliente nuevo, al cerrar el modal actualizamos la lista.
   */
  async openModal(parent: Parent) {
    var modal = await this.modalController.create({
      component: ModalAddParentPage,
      cssClass: 'trasparent-modal',
      componentProps: {
        'parent': parent
      }
    });
    await modal.present();

    modal.onWillDismiss().then(async (data) => {
      console.log(data.data)

     
        this.searchedUser = await this.servicioClient.getClient();
      

    })



  }
  /**
   * 
   * Modal que lo utilizamos para editar a un cliente, al cerrar el modal actualizamos la lista.
   */
  async editModal(parent: Parent) {
    const modal = await this.modalController.create({
      component: ModalEditParentPage,
      cssClass: 'trasparent-modal',
      componentProps: {
        'parent': parent
      }
    });
    return await modal.present();

  }

  /**
   * Exportamos a excel los datos que se encuentren en la base de datos.
   */
  exportToExcel() {
    this.data.exportToExcel(this.clients, 'Clientes');
  }


}


