import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { FelicitationService } from 'src/app/services/felicitation.service';
import { Kid } from 'src/app/model/Kid';
import { Felicitation } from 'src/app/model/Felicitation';
import { KidService } from 'src/app/services/kid.service';
import { ToastService } from 'src/app/services/toast.service';
import html2canvas from 'html2canvas';






@Component({
  selector: 'app-modal-add-felicitation',
  templateUrl: './modal-add-felicitation.page.html',
  styleUrls: ['./modal-add-felicitation.page.scss',]['./global.scss']
})



export class ModalAddFelicitationPage implements OnInit {
  @ViewChild('previewimage') waterMarkImage: ElementRef;

  //---
  originalImage = null;
  //---

  public formFelicitation: FormGroup;
  public form: FormGroup;
  imageOriginal: string;
  selectedType: number;  //Tipo felicitacion
  selectedFondo: number;  //Fondo de felicitacion


  kidInvitacion: Kid = {
    birthDate: undefined,
    client: [],
    felicitations: [],
    gender: false,
    name: ''
  };
  selectedKid: Kid;    // Niñ@ seleccionado
  kid: Kid;
  kids: Kid[] = [];
  //
  //Imagenes para elegir como fondo para felicitación
  //Todas del mismo tamaño guardadas en cloudinary
  /*
  imagenUno: string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1653923489/WhatsApp_Image_2022-05-30_at_2.42.16_PM_so0iti.jpg";
  imagenDos: string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1653923489/WhatsApp_Image_2022-05-30_at_2.42.16_PM_1_psxe5k.jpg";
  imagenTres: string = "https://res.cloudinary.com/dcbl6rgf5/image/upload/v1653923489/WhatsApp_Image_2022-05-30_at_2.42.17_PM_ttzysn.jpg";
*/
  imagenUno: string = "assets/imagenesFeli/Imagen1.jpeg";
  imagenDos: string = "assets/imagenesFeli/Imagen2.jpeg";
  imagenTres: string = "assets/imagenesFeli/Imagen3.jpeg";
  InfoFonfo: number;
  ImagenFondo: string = "";
  imgcreada = false;
  imagenCreada:string;

  fraseNanakids:string="";

  //BOTON DESHABILITADO
  public disabledDescargar = true;
  public disabledCrear = true;
  public disabledGuardar = true;
  public disabledElegir = true;
  //
  constructor(private fb: FormBuilder, private apiFelicitation: FelicitationService,
    private modalController: ModalController, private kidService: KidService, public toast: ToastService) {

    this.formFelicitation = this.fb.group({
      type: [],
      kid: [],
      estate: false,
      image: "",
      dateSend: undefined,
      id: -1

    });

    this.form = this.fb.group({
      multipartFile: [null]
    })

  }

  async ngOnInit() {
  }
  async ionViewDidEnter() {

    await this.getKidS();
  }


  public async createFelicitation() {

    let newFelicitation: Felicitation = {

      type: this.selectedType,
      kid: this.selectedKid,
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
    console.log("ESTE ES EL CONSOLE" + this.form.get('multipartFile').value);

    this.toast.presentToast("Felicitacion creada con exito", 2000, "center", "success");
    this.exit();

  }
//OBTENER LOS HIJOS
  public async getKidS() {
    this.kids = await this.kidService.getKid();
    console.log(this.kid);
  }

  //BOTONES PARA ELEGIR FONDO
  b1() {
    this.InfoFonfo = 1;
    this.ImagenFondo = this.imagenUno;
    console.log("FONDO 1 ELEGIDO");
    console.log(this.imagenUno);
    this.disabledCrear=false;
  }
  b2() {
    this.InfoFonfo = 2;
    this.ImagenFondo = this.imagenDos
    console.log("FONDO 2 ELEGIDO");
    console.log(this.imagenDos);
    this.disabledCrear=false;

  }
  b3() {
    this.InfoFonfo = 3;
    this.ImagenFondo = this.imagenTres;
    console.log("FONDO 3 ELEGIDO");
    console.log(this.imagenTres);
    this.disabledCrear=false;

  }
//ELEGIR HIJO
  elegirHijo(event: CustomEvent) {
    this.selectedKid = event.detail.value;
    this.kidInvitacion = this.selectedKid;
    this.fraseNanakids = "¡¡ Disfruta de tu dia, con cariño NANAKIDS !!";
    console.log(this.selectedKid);
  }
//ELEGIR TIPO FELICITACION
  notifyChange(event: CustomEvent) {
    this.selectedType = event.detail.value;
    console.log(this.selectedType);
  }

  elegirFondo(event: CustomEvent) {
    this.selectedFondo = event.detail.value;
    console.log(this.selectedFondo);
  }
  activarBt(){
    this.disabledElegir=false;
  }
  //ELEGIR IMAGEN DESCARGADA
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      multipartFile: file
    });
    this.form.get('multipartFile').updateValueAndValidity();
    this.disabledGuardar=false;
  }
  //
  //---GENERAR IMAGEN A PARTIR DE UN DIV
  crearImagen() {
    html2canvas(document.querySelector("#contenido")).then(canvas => {
      this.imagenCreada = canvas.toDataURL();      
    });
    this.imgcreada = true;
    console.log(this.imagenCreada);
    console.log(this.imgcreada);
    this.disabledDescargar=false;
    this.toast.presentToast("Imagen lista para descargar.", 2000, "center", "success");

  }
  //---
  async exit() {
    await this.modalController.dismiss(null, 'cancel');
  }
}