import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Admin } from 'src/app/model/Admin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  person: Admin;
  public formAdmin: FormGroup;

  constructor(private router: Router, private authS: AuthService, private fb: FormBuilder, private toast: ToastController, private alert: AlertController) {
    this.formAdmin = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });

  }

  /**
     * Comprobamos si esta logeado , en caso de estar logeado sen envia a la pantalla principal
     */
  async ngOnInit() {

    if (await this.authS.isLogged()) {
      this.router.navigate(['private/tabs/tab1']);
    }

  }

  /**
   * Comprobamos si esta logeado , en caso de estar logeado sen envia a la pantalla principal
   */
  async ionViewWillEnter() {

    if (await this.authS.isLogged()) {
      this.router.navigate(['private/tabs/tab1']);
    }

  }

  /**
   * 
   * @returns
   * Recogemos los campos email y contraseña y realizamos una peticion a firebase .
   * En caso de ser correcto el login nos devolvera el usuario y entraremos a la pagina principal.
   */
  public async logIn() {
    if (!this.formAdmin.valid) return;

    try {
      await this.authS.login(this.formAdmin.value.email, this.formAdmin.value.password)


    } catch (error) {
      this.presentToast();
    }

  }

  async presentToast() {
    const toast = await this.toast.create({
      message: "Inserte un correo valido",
      position: 'top'
    });
    toast.present();
  }

}