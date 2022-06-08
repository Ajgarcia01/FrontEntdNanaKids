import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Kid } from 'src/app/model/Kid';
import { Parent } from 'src/app/model/Parent';
import { ClientService } from 'src/app/services/client.service';
import { KidService } from 'src/app/services/kid.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modal-edit-kid',
  templateUrl: './modal-edit-kid.page.html',
  styleUrls: ['./modal-add-kid.page.scss',]['./global.scss'],
})
export class ModalEditKidPage {
  @Input() kid:Kid; //Input para traer los datos del niño selccionado y pasar informacion de una pantalla  a otra
  @ViewChild(IonDatetime)datetime:IonDatetime //IonDate para establecer el modal que abre el picker de la fecha
  selectecMode='date'; //Seleccionar del picker de la fecha
  showPicker=false;  //Metodo para cerrar el modal
  dateValue= format(new Date(),'yyy-MM-dd'); //Campo para formatear la fecha
  formattedString=''; //Campo para establecer la fecha formateada
  public formKid:FormGroup; //Formulario
  parents:Parent[]=[] //Lista de los padres
  selectedOption:boolean; //Género seleccionado en el select
  enviado: string ="Niño"; //Formato para establecer el genero en niño
  noenviado: string ="Niña"; // Formato para establecer el genero en niña
  selectedParent:Parent[]=[]; //Array de padres seleccionados en el select


  
  constructor(private fb:FormBuilder,private apiKid:KidService,private modalController:ModalController,private ClientService:ClientService,
    private toast:ToastService) {

    this.formKid=this.fb.group({
      name:["",Validators.required],
      gender:[""],
      birth_date:[""],
    });

    this.setToday();

   }

  /*
  * Se establecen los valores del niñ@ elegid@ (@Input: Kid)
  * Nos traemos a los padres, por si el usuario quiere cambiar los padres del niño
  */

  async ionViewDidEnter(){
    
    this.formKid=this.fb.group({
      name:[this.kid.name],
      gender:[this.kid.gender],
      birth_date:[this.kid.birthDate],
      
    });
    await this.getParents();
  
    
  }

  /*
  *
  * Metodo para editar el niño
  * Se crea un modelo y se pasan los parametros establecidos por el usuario en el formulario
  * Se hace una peticion (UPDATE) a la API para EDITAR el niño (updateKid)
  * Una vez editado el niño se cierra el modal y se presenta un mensaje de exito (Toast)
  * 
  */

  public async createKid(){
   
    let newKid:Kid={
        name:this.formKid.get("name").value,
        birthDate:this.dateValue,
        gender:this.selectedOption,
        client:this.selectedParent,
        felicitations:[],
        id:this.kid.id
    }
    try {
      await this.apiKid.updateKid(newKid);
      await this.toast.presentToast("Niño actualizado con exito",10,"middle","success");
      this.modalController.dismiss(true);
    } catch (err) {
      await this.toast.presentToast("Hay errores",10,"middle","danger");
      console.log(err);
    }
   
   }

  //Método para formatear la fecha al formato de la base de datos
  dateChanged(value)
  {
    this.dateValue=value;
    this.formattedString= format(parseISO(value),'yyyy-MM-dd');
      console.log(value);
  }

  //Se establece la fecha del día actual formateada
  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')),'yyyy-MM-dd');
  }

  //Metodo para cerrar el picker de la fecha
  close(){
    this.datetime.cancel(true);
  }

  //Metodo para confimar la fecha una vez que el usuario la ha elegido en el picker-date
  select(){
    this.datetime.confirm(true);
  }


  /*
  * Metodo para obtener los padres
  * Se hace una peticion a la API (GET) para obtener los padres (ClientService)
  */

  public async getParents(){
    this.parents=[];
    this.parents=await this.ClientService.getClient();
    console.log(this.parents);

    
  }


  /*
   * @param event 
   * Cambia el select cuando se hace un cambio imprimiendo la opcion seleccionada
   * Se establece para el género
  */

  notifyChange(event:CustomEvent){
    this.selectedOption=event.detail.value;
    console.log(this.selectedOption);
  }

  /*
   * @param event 
   * Cambia el nombre del género (true=niño, false=niña)
   * Se establece para la seleccion de genero
  */

  conversorEstado(gender:Kid):string{
    if (gender.gender){
     return  this.enviado;
    }else{
     return this.noenviado;
    }
  }

  /*
   * @param event 
   * Cambia el select cuando se hace un cambio imprimiendo la opcion seleccionada
   * Se establece para la seleccion de padres
  */

   cambioPadre(event:CustomEvent){
    
    this.selectedParent=event.detail.value;

    console.log(this.selectedParent);
  }

  /*
  * Metodo para cerrar el modal
  */

  async exit(){
    await this.modalController.dismiss(null , 'cancel');
  }
}
