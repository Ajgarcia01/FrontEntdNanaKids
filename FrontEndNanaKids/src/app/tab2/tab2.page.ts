import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Kid } from '../model/Kid';
import { Parent } from '../model/Parent';
import { ModalAddParentPage } from '../pages/modal-add-parent/modal-add-parent.page';
import { ApiService } from '../services/api.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  client: Parent
  clients: Parent[] = []
  gender: boolean = true
  searchedUser: any;

  constructor(private servicioClient: ClientService, private alertController:AlertController,public modalController:ModalController) { }


  async ionViewDidEnter() {

    await this.getClients();
    this.searchedUser = this.clients;
  }

  public async getClients() {
    this.clients = [];
    this.clients = await this.servicioClient.getClient();
  }
  public async getclientsid(client: Parent) {
    this.client = await this.servicioClient.GetClientByID(client.id);
    console.log(this.client);
  }

  public async DeleteClient(client: Parent) {
    
    const alert = await this.alertController.create({
      header:'Confirmación',
      message:'Estas seguro de que quieres eliminar',
      buttons: [
        {
          text:'Cancelar',
          handler:(blah)=>{
            //nada
          }
        },
        {
          text:'Eliminar',
          handler: async()=>{
            try {
              await this.servicioClient.DeleteClient(client.id);
              console.log(client);
              //Para recargar la lista
              let i = this.clients.indexOf(client,0);
              if(i>-1){
                this.clients.splice(i,1);
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    });
    await alert.present();
  }

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

  async openModal(parent:Parent){
    const modal = await this.modalController.create({
      component: ModalAddParentPage,
      componentProps: {
        'parent': parent
      }
    });
    //this.closeSliding();
    return await modal.present();
  }

}
