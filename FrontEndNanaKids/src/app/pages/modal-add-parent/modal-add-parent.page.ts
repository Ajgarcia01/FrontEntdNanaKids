import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Parent } from 'src/app/model/Parent';
import { ClientService } from 'src/app/services/client.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-modal-add-parent',
  templateUrl: './modal-add-parent.page.html',
  styleUrls: ['./modal-add-parent.page.scss',]['./global.scss'],
})
export class ModalAddParentPage implements OnInit {
  public formParent: FormGroup;//Formulario
  private selectedOption: number; //select gender
  private gender: boolean;//Genero del cliente

  constructor(private fb: FormBuilder, private modalController: ModalController, private apiparent: ClientService,public toast: ToastService) {

   
  }


  ionViewDidEnter(){
    this.formParent.invalid
  }
/**
 * Creacion del formulario y diferente validaciones a la hora de completar
 */
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
   * @param parent Va
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
  * Metodo para crear el Cliente
  * Se crea un modelo y se pasan los parametros establecidos por el usuario en el formulario
  * Se hace una peticion (POST) a la API para crear el cliente 
  * Una vez creado el cliente se cierra el modal y se presenta un mensaje de exito (Toast)
  * 
  */
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
      
        await this.apiparent.CreateClient(newParent); 
        await this.toast.presentToast("Cliente creado con exito",2000,"center","success");
        await this.formParent.reset();
        await this.modalController.dismiss(true);
    }catch (err) {
      this.toast.presentToast("Hay algun error revisa los datos",2000,"center","danger");
      console.log(err);
    }

  }

  /**
   * Cerrar el modal y volver a la pantalla principal
   */
  async exit() {
    await this.modalController.dismiss(false);
  }
}
