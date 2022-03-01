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
  person:Admin;
  public formAdmin:FormGroup;
  constructor(private router:Router,private authS:AuthService,private fb:FormBuilder,private toast:ToastController,private alert:AlertController) {
    this.formAdmin=this.fb.group({
      email:["",Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      password:["",Validators.required],
    });

  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    
    if(this.authS.isLogged){
     console.log('iniciado');
     
    }else{
      console.log('no iniciado');
      
    }
    
  }


  public async logIn(email: { value: string; },password: { value: string; }) {
    try {
      const user:any=await this.authS.loginwithEmail(email.value,password.value);
      if(user){
        this.router.navigate(['home/tabs/tab1']);
      }else{
        this.presentToast();
      }
    } catch (error) {
      
    }

  }

  async presentToast() {
    const toast = await this.toast.create({
      message: "Inserte un correo valido",
      position:'top'
    });
    toast.present();
  }

 

}
