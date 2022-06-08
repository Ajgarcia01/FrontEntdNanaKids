import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Felicitation } from '../model/Felicitation';
import { messsage } from '../model/message';
import { Parent } from '../model/Parent';
import { DataService } from '../services/data.service';
import { FelicitationService } from '../services/felicitation.service';
import { KidService } from '../services/kid.service';
import { MessageService } from '../services/message.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  formattedString=''; //Fecha formateada
  estadodelenvio=''; //Campo para establecer el estado del envio (Enviado/No enviado) para asignarlo en el front
  count:Number; //Campo para establecer el numero de felicitaciones que hay en el dia 
  fel:Felicitation; //Felicitacion
  felicidades:Felicitation[]=[]; //Felicitaciones
  par:Parent; //Padre
  miLoading:HTMLIonLoadingElement; //Loading
  constructor(private feliSer:FelicitationService,private messageApi:MessageService,private kid:KidService,private data:DataService,private loading:LoadingController,
    private router:Router,private storage:StorageService) { 
    this.setToday();
  }

  //Se inicializa a no enviadas las felicitaciones
  ngOnInit() {
    this.estadodelenvio='NO ENVIADO'
  }

  /*
    *
    * @return un excel con todos los datos de cada niño, con el nombre de 'Felicidades.xlsx' y con el array de niños que haya en la BBDD
    * 
  */
  
  exportToExcel() {
    this.data.exportToExcel(this.felicidades, 'Felicidades');
  }
    

  /**
   * @return todas las felicitaciones que haya el dia en el que este el usuario antes de que cargue la pagina al completo
  */

   async ionViewDidEnter() {
    let user = await this.storage.getItem('user');
    if (user == null) {
      this.router.navigate(['']);

    }
     this.countFelicitation();
  }

 /**
   * @return manda todas las felicitaciones que haya el dia a sus respectivos padres asignados a los niños via whatsapp
   * En este caso, solo de cumpleaños (Type=1)
   * Se hace una llamada a la api para enviar el mensaje (mensajeApi.sendMessage) (POST)
 */
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

  /**
     * Se establece la fecha del día actual formateada
  */

    setToday(){
      this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')),'dd-MM-yyyy');
    }


  /**
   * @param event 
   * @return el numero de todas las feliciationes que haya en el día actual
   * Haciendo una peticion a la api para obtener una cuenta
  */

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

  /*
    * @return carga el loading y lo muestra en pantalla (se usa en todas las funciones que cargan datos) con un mensaje de cargando
    * 
  */

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


