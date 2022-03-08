import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Admin } from 'src/app/model/Admin';
import { Parent } from 'src/app/model/Parent';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-modal-add-parent',
  templateUrl: './modal-add-parent.page.html',
  styleUrls: ['./modal-add-parent.page.scss'],
})
export class ModalAddParentPage implements OnInit {
  public formParent: FormGroup;
  private selectedOption: number; //select gender
  private gender: boolean;

  constructor(private fb: FormBuilder, private modalController: ModalController, private apiparent: ClientService,public toastCtrl: ToastController) {

   
  }


  ionViewDidEnter(){
    this.formParent.invalid
  }

  ngOnInit() {

    this.formParent = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      dni: ["", Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]{8}[A-Za-z]{1}")
      ])],

      email: ["", Validators.compose([
        Validators.required,
        Validators.email
      ])],
      phone: ["", Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ])],
      surname: ["",Validators.required],
      type: ["",Validators.required]
    });


  }

  /**
  * 
  * @param event 
  */
  notifyChange(event: CustomEvent) {
    this.selectedOption = event.detail.value;
    if (this.selectedOption == 1) {
      this.gender = true;
    } else {
      this.gender = false;
    }
    console.log(this.selectedOption);
  }

  public validar(parent: Parent): boolean {
    if (parent.name.length >= 1) {
      return true;
    }
    console.log(parent.name.length);
  }
  public async createParent() {
 
      if(!this.formParent.valid) return;

    let newParent: Parent = {
      name: this.formParent.get("name").value,
      dni: this.formParent.get("dni").value,
      email: this.formParent.get("email").value,
      phone: this.formParent.get("phone").value,
      surname: this.formParent.get("surname").value,
      kids: [],
      admin:{
        id: 1,
        user: "Eduardo",
        password: "1234",
        email: "educar200@gmail.com",
      },
      type: this.gender,
      id: -1
    }
    try {
      const toast = await this.toastCtrl.create({  
        message: 'Padre creado correctamente',   
        duration: 4000  
      });  
      toast.present()
        await this.apiparent.CreateClient(newParent); 
        console.log(newParent); 
    }catch (err) {
      console.log(err);
    }

  }
  public test(){
    console.log(this.formParent)
  }
  async exit() {
    await this.modalController.dismiss(null, 'cancel');
  }
}
