import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime, ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Kid } from 'src/app/model/Kid';
import { KidService } from 'src/app/services/kid.service';

@Component({
  selector: 'app-modal-add-kid',
  templateUrl: './modal-add-kid.page.html',
  styleUrls: ['./modal-add-kid.page.scss'],
})
export class ModalAddKidPage implements OnInit {
  @ViewChild(IonDatetime)datetime:IonDatetime
  selectecMode='date';
  showPicker=false;
  dateValue= format(new Date(),'yyy-MM-dd') + 'T09:00:00.000Z';
  formattedString='';
  public formKid:FormGroup;
  kids:Kid[]=[]
  selectedOption:number; //select gender

  
  constructor(private fb:FormBuilder,private apiKid:KidService,private modalController:ModalController) {

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
    
    await this.getKids();
  
    
  }

  public async createKid(){
   
    let newKid:Kid={
        name:this.formKid.get("name").value,
        birthDate:this.dateValue,
        gender:this.formKid.get('').value,
        client:this.formKid.get('').value,
        felicitations:this.formKid.get('').value,
        id:-1
    }
    try {
      await this.apiKid.createKid(newKid);
    } catch (err) {
      console.log(err);
    }
   
   }

  dateChanged(value)
  {
    this.dateValue=value;
    this.formattedString= format(parseISO(value),'HH:mm,MMM d, yyyy');
      console.log(value);
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')+'T09:00:00.00Z'),'HH:mm,MMM d, yyyy');
  }

  close(){
    this.datetime.cancel(true);
  }

  select(){
    this.datetime.confirm(true);
  }


  probar(){
    let name;let birth_date;let gender;
    name=this.formKid.get("name").value
    birth_date=this.dateValue;
    gender=this.selectedOption
    console.log(name)
    console.log(birth_date)
    console.log(gender)
  }

 


  public async getKids(){
    this.kids=[];
    this.kids=await this.apiKid.getKid();
    console.log(this.kids);

    
  }


  /**
   * 
   * @param event 
   */
    notifyChange(event:CustomEvent){
    this.selectedOption=event.detail.value;
    console.log(this.selectedOption);
  }


  async exit(){
    await this.modalController.dismiss(null , 'cancel');
  }



}
