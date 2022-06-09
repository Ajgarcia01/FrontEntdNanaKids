
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  selectedKid: Kid;    // Niñ@ seleccionado.
  kid: Kid;           //  Niñ@
  kids: Kid[] = [];  //   Array de niñ@s para seleccionar.

  /**
   * Imagenes para felicitación guardadas en ruta ../assets/imagenesFeli/
   */
  imagenUno: string = "assets/imagenesFeli/Imagen1.jpeg";
  imagenDos: string = "assets/imagenesFeli/Imagen2.jpeg";
  imagenTres: string = "assets/imagenesFeli/Imagen3.jpeg";
  //---

  InfoFonfo: number;//Info imagen de fondo escogida.
  ImagenFondo: string = "";
  imgcreada = false;  //Comprobante de si ha sido creada la imagen para la felicitación.
  imagenCreada: string; 

  fraseNanakids: string = ""; //Frase que apatecera en la parte inferior de la felicitacion.


  //BOTON DESHABILITADO
  public disabledDescargar = true;
  public disabledCrear = true;
  public disabledGuardar = true;
  public disabledElegir = true;
  //
  constructor(private fb: FormBuilder, private apiFelicitation: FelicitationService,
    private modalController: ModalController, private kidService: KidService, public toast: ToastService) {}


    ngOnInit() {

      this.form = this.fb.group({
        multipartFile: [null]
      })

      this.formFelicitation = this.fb.group({
        type: [[], Validators.required],
        kid: [[], Validators.required],
        estate: false,
        image: "",
        dateSend: undefined,
        id: -1

      });


      this.form = this.fb.group({
        multipartFile: [null]
      })

    }


  async ionViewDidEnter() {

    await this.getKidS();
  }


  /*
   * ->  Metodo crear Felicitación <-
   * Se crea un modelo y se pasan los parametros establecidos por el usuario en el formulario
   * Se hace una peticion (POST) a la API para crear la felicitación (createFelicitation)
   * Una vez creado la felicitación se cierra el modal y se presenta un mensaje de exito (Toast)
   * 
   */

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
    await this.apiFelicitation.createFelicitation(formData)
    await  this.modalController.dismiss(true);
    this.toast.presentToast("Felicitacion creada con exito", 2000, "center", "success");
  }

  /*
  *  -> Obtener todos los niñ@ para mostrarlos en el selector.  <-
  */
  public async getKidS() {
    this.kids = await this.kidService.getKid();
    console.log(this.kid);
  }

  /*
  *   -> Botones para elegir el fondo de la felicitacion.  <-
  * Cada uno de ellos corresponde a una imagen guardada en la ruta anterior.
  * Tras pulsar uno de ellos se activara el boton de crear imagen para felicitacion.
  */
  b1() {
    this.InfoFonfo = 1;
    this.ImagenFondo = this.imagenUno;
    console.log("FONDO 1 ELEGIDO");
    console.log(this.imagenUno);
    this.disabledCrear = false;
  }
  b2() {
    this.InfoFonfo = 2;
    this.ImagenFondo = this.imagenDos
    console.log("FONDO 2 ELEGIDO");
    console.log(this.imagenDos);
    this.disabledCrear = false;

  }
  b3() {
    this.InfoFonfo = 3;
    this.ImagenFondo = this.imagenTres;
    console.log("FONDO 3 ELEGIDO");
    console.log(this.imagenTres);
    this.disabledCrear = false;

  }
  /*
  * @param event
   * ->  Metodo para elegir el Niñ@ en el desplegable <-
   * Nos mostrara todos los niñ@s y elegiremos al que vaya dirigida la felicitación.
   * Tambien añadira una frase en la parti inferior de la felicitación.
   * 
   */
  elegirHijo(event: CustomEvent) {
    this.selectedKid = event.detail.value;
    this.kidInvitacion = this.selectedKid;
    this.fraseNanakids = "¡¡ Disfruta de tu dia, con cariño NANAKIDS !!";
    console.log(this.selectedKid);
  }
  /*
  * @param event
   * ->  Metodo para elegir el tipo de felicitación en el desplegable <-
   * Nos mostrara todos los tipos de  felicitación.
   * Tambien añadira una frase en la parti inferior de la felicitación.
   * 
   */
  notifyChange(event: CustomEvent) {
    this.selectedType = event.detail.value;
    console.log(this.selectedType);
  }
/*
  elegirFondo(event: CustomEvent) {
    this.selectedFondo = event.detail.value;
    console.log(this.selectedFondo);
  }
  */

  /*
   * ->  Metodo para activar boton de elegir archivo <-
   * Activara el boton de seleccionar archivo para escoger la imagen personalizada de la felicitación.
   * 
   */
  activarBt() {
    this.disabledElegir = false;
  }

  /*
   * @param event
   * ->  Metodo seleccionar imagen que ha sido descargada <-
   * Nos permitira elegir la imagen previamente personalizada y descargada en nuestro pc.
   * Ademas activara el botón de Guardar felicitación.
   * 
   */
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      multipartFile: file
    });
    this.form.get('multipartFile').updateValueAndValidity();
    this.disabledGuardar = false;
  }
  /*
   * ->  Generar imagen a partir de un Div <-
   * Esta función nos permitira generar una imagen a partir de div que previsualizamos al introducir los parametros
   * de la felicitación. Todo lo que aparezca en el Div con id=contenido , sera convertido a imagen una vez se ejecute
   * esta función. 
   * 
   */
  crearImagen() {
    html2canvas(document.querySelector("#contenido")).then(canvas => {
      this.imagenCreada = canvas.toDataURL();
    });
    this.imgcreada = true;
    console.log(this.imagenCreada);
    console.log(this.imgcreada);
    this.disabledDescargar = false;
    this.toast.presentToast("Imagen lista para descargar.", 2000, "center", "success");

  }
  /*
  * Metodo para cerrar el modal
  */
  async exit() {
    await this.modalController.dismiss(null, 'cancel');
  }
}