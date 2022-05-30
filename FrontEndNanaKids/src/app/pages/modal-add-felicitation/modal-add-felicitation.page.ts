import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FelicitationService } from 'src/app/services/felicitation.service';
import { Kid } from 'src/app/model/Kid';
import { Felicitation } from 'src/app/model/Felicitation';
import { KidService } from 'src/app/services/kid.service';
import { ToastService } from 'src/app/services/toast.service';



@Component({
  selector: 'app-modal-add-felicitation',
  templateUrl: './modal-add-felicitation.page.html',
  styleUrls: ['./modal-add-felicitation.page.scss']['./global.scss'],
})
export class ModalAddFelicitationPage implements OnInit {

  public formFelicitation:FormGroup;
  public form:FormGroup;
  
  selectedType:number;  //Tipo felicitacion
  selectedKid:Kid;    // Niñ@ seleccionado
  kid:Kid;
  kids:Kid[] =[];
  constructor(private fb:FormBuilder,private apiFelicitation:FelicitationService,
    private modalController:ModalController, private kidService:KidService,public toast: ToastService) {
    
    

    
    
  }
  
  ngOnInit() {
    
    this.form = this.fb.group({
      multipartFile:[null]
    })

    this.formFelicitation=this.fb.group({
      type:[[],Validators.required],
      kid:[[],Validators.required],
      estate:false,
      image:"",
      dateSend: undefined,
      id:-1

    });

  }
  async ionViewDidEnter(){
    
    await this.getKidS();
  }
public async createFelicitation(){
   
    let newFelicitation:Felicitation={
    
      type:this.selectedType,
      kid:this.selectedKid ,
      estate: false,
      id: -1,
      image: "",
      dateSend: undefined


    }
    var formData: any = new FormData();
    formData.append("f", new Blob([JSON.stringify(newFelicitation)], {
      type: "application/json"
    }));
    formData.append("photo", this.form.get('multipartFile').value);
    this.apiFelicitation.createFelicitation(formData).then(response => {
      console.log(response);
    })
    console.log("ESTE ES EL CONSOLE"+this.form.get('multipartFile').value);
    
    this.toast.presentToast("Felicitacion creada con exito",2000,"center","success");
    this.exit();
   
   }

   uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      multipartFile: file
    });
    this.form.get('multipartFile').updateValueAndValidity();

    
  }

   public async getKidS(){
    this.kids= await this.kidService.getKid();
    console.log(this.kid);

    
  }
  elegirHijo(event:CustomEvent){
    this.selectedKid=event.detail.value;
    console.log(this.selectedKid);
  }
  
  notifyChange(event:CustomEvent){
    this.selectedType=event.detail.value;
    
    console.log(this.selectedType);
    
  }
  /*
  public async  selectImage():Promise<any>{
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType:CameraResultType.Base64,
      source:CameraSource.Photos
      
    });
    console.log(image);
  }
  */
  async exit(){
    await this.modalController.dismiss(null , 'cancel');
  }


}
