import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Parent } from 'src/app/model/Parent';
import { Kid } from 'src/app/model/Kid';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-modal-edit-parent',
  templateUrl: './modal-edit-parent.page.html',
  styleUrls: ['./modal-edit-parent.page.scss'],
})
export class ModalEditParentPage implements OnInit {
  @Input() parent:Parent;//Cliente que nos pasan para actualizar

  private client:Parent;//Cliente a modificar
  public formParent: FormGroup;//Formulario
  private selectedOption: number; //select gender
  private gender: boolean;//Genero del cliente

  constructor(private fb: FormBuilder, private modalController: ModalController, private apiparent: ClientService,public toastCtrl: ToastController) {

   
  }


  ionViewDidEnter(){
    this.formParent.invalid

    
  }
/**
 * Creacion del formulario y diferente validaciones a la hora de completar
 */
  ngOnInit() {
    this.client=this.parent;
    console.log(this.parent);
    this.formParent = this.fb.group({
      name: [this.parent.name, Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      dni: [this.parent.dni, Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]{8}[A-Za-z]{1}")
      ])],

      email: [this.parent.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      phone: [this.parent.phone, Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ])],
      surname: [this.parent.surname,Validators.required],
      type: [this.parent.type,Validators.required]
    });


  }

 /*
   * @param event 
   * Cambia el select cuando se hace un cambio imprimiendo la opcion seleccionada
   * Se establece para el género
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
  /**
   * 
   * @param parent Cliente
   * @returns Devuelve un true en caso de que haya cumplido la validacion
   */
  public validar(parent: Parent): boolean {
    if (parent.name.length >= 1) {
      return true;
    }
    console.log(parent.name.length);
  }
     /*
  *
  * Metodo para actualizar el Cliente
  * Se crea un modelo y se pasan los parametros establecidos por el usuario en el formulario
  * Se hace una peticion (UPDATE) a la API para actualizar el cliente 
  * Una vez actualizado el cliente se cierra el modal y se presenta un mensaje de exito (Toast)
  * 
  */
  public async UpdateParent() {
    let Kids:Kid[]=this.parent.kids;
   
      if(!this.formParent.valid) return;

      this.parent = {
      name: this.formParent.get("name").value,
      dni: this.formParent.get("dni").value,
      email: this.formParent.get("email").value,
      phone: this.formParent.get("phone").value,
      surname: this.formParent.get("surname").value,
      kids:[],
      admin:{
        id: 1,
        user: "Eduardo",
        password: "1234",
        email: "educar200@gmail.com"
      },
      type: this.gender,
      id: this.parent.id
    }
    try {
      const toast = await this.toastCtrl.create({  
        message: 'Padre Actualizado correctamente',   
        duration: 4000  
      });  
      toast.present()
      console.log(this.parent);
        await this.apiparent.updateClient(this.parent);
        this.modalController.dismiss(null , 'cancel');
    }catch (err) {
      console.log(err);
    }

  }
  /**
   * Cierra el modal
   */
  async exit() {
    await this.modalController.dismiss(null, 'cancel');
  }

}
