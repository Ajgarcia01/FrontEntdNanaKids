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
  @ViewChild(IonDatetime)datetime:IonDatetime
  selectecMode='date';
  showPicker=false;
  dateValue= format(new Date(),'yyy-MM-dd') + 'T09:00:00.000Z';
  formattedString='';
  public formKid:FormGroup;
  kids:Kid[]=[]
  parents:Parent[]=[]
  selectedOption:boolean; //select gender
  selectedParent:Parent[]=[];
  
  constructor(private fb:FormBuilder,private apiKid:KidService,private modalController:ModalController,private ClientService:ClientService,private toast:ToastService) {

   
    this.setToday();

   }

  ngOnInit() {

     this.formKid=this.fb.group({
      name:["",Validators.compose([Validators.required,Validators.minLength(1)])],
      gender:["",Validators.required],
      birth_date:[""],
      client:[[],Validators.required],
      felicitations:[],
      id:-1
      
    });

  }

  async ionViewDidEnter(){
    this.formKid.invalid
    await this.getParents();
  
    
  }

  public async createKid(){
   
    if(!this.formKid.valid) return;

    let newKid:Kid={
        name:this.formKid.get("name").value,
        birthDate:this.formattedString,
        gender:this.formKid.get("gender").value(this.selectedOption),
        client:this.formKid.get("client").value(this.selectedParent),
        felicitations:[],
        id:-1

    }
    try {
      console.log(newKid);
        
      await this.apiKid.createKid(newKid);
      await this.toast.presentToast("Felicitacion creada con exito",2000,"center","success");
      await this.formKid.reset();
      this.modalController.dismiss(null , 'cancel');
      

    } catch (err) {
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
