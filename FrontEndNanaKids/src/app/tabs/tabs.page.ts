import { Component } from '@angular/core';
import { IonRefresher, LoadingController } from '@ionic/angular';
import { Kid } from '../model/Kid';
import { KidService } from '../services/kid.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  kids:Kid []=[]
  miLoading:HTMLIonLoadingElement
  refresh:IonRefresher
  constructor(private api:KidService,private loading:LoadingController) {}

  public async getKids(event){
    if(!event){
      await this.presentLoading();
    }
    this.kids=[];
    try{
      this.kids=await this.api.getKid();
    }catch(err){
      console.error(err);
      //await this.presentToast("Error cargando datos","danger",'bottom');
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
      message: ''
    });
    await this.miLoading.present();
  }
}
