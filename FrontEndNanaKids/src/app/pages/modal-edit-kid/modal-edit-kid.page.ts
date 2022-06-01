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
export class ModalEditKidPage implements OnInit {
  @Input() kid:Kid;
  @ViewChild(IonDatetime)datetime:IonDatetime
  selectecMode='date';
  showPicker=false;
  dateValue= format(new Date(),'yyy-MM-dd');;
  formattedString='';
  public formKid:FormGroup;
  parents:Parent[]=[]
  selectedOption:boolean; //select gender
  enviado: string ="Niño";
  noenviado: string ="Niña";;
  selectedParent:Parent[]=[];


  
  constructor(private fb:FormBuilder,private apiKid:KidService,private modalController:ModalController,private ClientService:ClientService,
    private toast:ToastService) {

    this.formKid=this.fb.group({
      name:["",Validators.required],
      gender:[""],
      birth_date:[""],
    });

    this.setToday();

   }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    
    this.formKid=this.fb.group({
      name:[this.kid.name],
      gender:[this.kid.gender],
      birth_date:[this.kid.birthDate],
      
    });
    await this.getParents();
  
    
  }

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
    } catch (err) {
      await this.toast.presentToast("Hay errores",10,"middle","danger");
      console.log(err);
    }
   
   }

  dateChanged(value)
  {
    this.dateValue=value;
    this.formattedString= format(parseISO(value),'yyyy-MM-dd');
      console.log(value);
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')),'yyyy-MM-dd');
  }

  close(){
    this.datetime.cancel(true);
  }

  select(){
    this.datetime.confirm(true);
  }


  public async getParents(){
    this.parents=[];
    this.parents=await this.ClientService.getClient();
    console.log(this.parents);

    
  }


  /**
   * 
   * @param event 
   */
    notifyChange(event:CustomEvent){
    this.selectedOption=event.detail.value;
    console.log(this.selectedOption);
  }


  conversorEstado(gender:Kid):string{
    if (gender.gender){
     return  this.enviado;
    }else{
     return this.noenviado;
    }
  }

  /**
   * 
   * @param event 
   */
   cambioPadre(event:CustomEvent){
    
    this.selectedParent=event.detail.value;

    console.log(this.selectedParent);
  }

  async exit(){
    await this.modalController.dismiss(null , 'cancel');
  }
}
