import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Kid } from 'src/app/model/Kid';
import { Parent } from 'src/app/model/Parent';
import { ClientService } from 'src/app/services/client.service';
import { KidService } from 'src/app/services/kid.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modal-add-kid',
  templateUrl: './modal-add-kid.page.html',
  styleUrls: ['./modal-add-kid.page.scss',]['./global.scss'],
})
export class ModalAddKidPage implements OnInit {
  @ViewChild(IonDatetime)datetime:IonDatetime // IonDate para establecer el modal que abre el picker de la fecha
  selectecMode='date'; //Seleccionar del picker de la fecha
  showPicker=false; //Metodo para cerrar el modal
  dateValue= format(new Date(),'yyy-MM-dd') + 'T09:00:00.000Z'; //Campo para formatear la fecha
  formattedString=''; //Campo para establecer la fecha formateada
  public formKid:FormGroup; //Formulario
  parents:Parent[]=[] //Lista de los padres
  selectedOption:boolean; //Genero seleccionado en el select
  selectedParent:Parent[]=[]; //Array [] de Padres seleccionados en el select
  
  constructor(private fb:FormBuilder,private apiKid:KidService,private modalController:ModalController,private ClientService:ClientService,private toast:ToastService) {
  
    this.setToday();
   
  }

  
  /*
  *
  * Se establecen los validadores para el formulario:
  *  - name: nombre del niño con al menos un caracter
  *  - género: seleccionar un género
  *  - fecha de nacimiento: seleccionar una fecha
  *  - padres: seleccionar padres, se establece un array como validador
  */

  ngOnInit() {

     this.formKid=this.fb.group({
      name:["",Validators.compose([Validators.required,Validators.minLength(1)])],
      gender:["",Validators.required],
      birth_date:[this.formattedString],
      client:[[],Validators.required],
      felicitations:[],
      id:-1
      
    });

  }

  /*
  *
  * Se obtienen los padres para posteriormente seleccionar cada uno de ellos en el formulario
  * El formulario se pone en invalido para que el usuario este obligado a rellernarlo todo para poder crear un niño
  * 
  */

  async ionViewDidEnter(){
    this.formKid.invalid
    await this.getParents();
  
    
  }


  /*
  *
  * Metodo para crear el niño
  * Se crea un modelo y se pasan los parametros establecidos por el usuario en el formulario
  * Se hace una peticion (POST) a la API para crear el niño (createKid)
  * Una vez creado el niño se cierra el modal y se presenta un mensaje de exito (Toast)
  * 
  */

  public async createKid(){
   
    if(!this.formKid.valid) return;

    let newKid:Kid={
        name:this.formKid.value.name,
        birthDate:this.formattedString,
        gender:this.formKid.value.gender,
        client:this.selectedParent,
        felicitations:[],
        id:-1
    }
    try {
      await this.apiKid.createKid(newKid);
      await this.toast.presentToast("Felicitacion creada con exito",2000,"center","success");
      await this.formKid.reset();
      this.modalController.dismiss(true);
      
    } catch (err) {
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

    notifyChange(event){
    this.selectedOption=event.detail.value;
    
    console.log(this.selectedOption);
    
  }

   /*
   * @param event 
   * Cambia el select cuando se hace un cambio imprimiendo la opcion seleccionada
   * Se establece para la seleccion de padres
   */
  
   cambioPadre(event){
    
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
