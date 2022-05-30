import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Felicitation } from '../model/Felicitation';
import { messsage } from '../model/message';
import { Parent } from '../model/Parent';
import { DataService } from '../services/data.service';
import { FelicitationService } from '../services/felicitation.service';
import { KidService } from '../services/kid.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  formattedString='';
  estadodelenvio='';
  count:Number;
  fel:Felicitation;
  felicidades:Felicitation[]=[];
  par:Parent;
  miLoading:HTMLIonLoadingElement;
  constructor(private feliSer:FelicitationService,private messageApi:MessageService,private kid:KidService,private data:DataService,private loading:LoadingController) { 
    this.setToday();
  }

  ngOnInit() {
    this.estadodelenvio='NO ENVIADO'
  }
    exportToExcel() {
    this.data.exportToExcel(this.felicidades, 'Felicidades');
  }
    


 async ionViewDidEnter(){
   
    
    this.countFelicitation();
   
  }


  async sendMessage(){
    let hoy:Felicitation[]= await this.feliSer.getFelicitationsByTypeAndDate(1);
    

    for(let entry of hoy){
      console.log(entry);
      let newmessage: messsage = {
        client:entry.kid.client,
        felicitation: entry,
        message:'Cumpleaños feliz, te deseamos un feliz día',
        urlImage:entry.image
      }
      await this.messageApi.sendMessage(newmessage);
    }
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')),'dd-MM-yyyy');
  }


 async countFelicitation(event?){
   
    if(!event){
      await this.presentLoading();

      this.count=0;
    }else{
      try {
        this.feliSer.getFelicitationsByTypeAndDate(1).then(data=>{
          console.log('cantidad de felicitaciones hoy----> '+data.length);
           this.count=data.length
          });

          this.felicidades=[]
          this.felicidades= await this.feliSer.getFelicitations();
        
      } catch (error) {
        console.log(error);
        
      }finally{
        if(event){
          event.target.complete();
        }else{
          await this.miLoading.dismiss();
        }
      }
    }
  }

  async presentLoading() {
    this.miLoading = await this.loading.create({
      message: 'CARGANDO',
      spinner:'lines-sharp',
      mode:'ios',
      duration: 1200
    });
    await this.miLoading.present();
  }
}


