import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/Admin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  person:Admin;
  constructor(private router:Router,private authS:AuthService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.authS.isLogged){
      //this.router.navigate(['private/tabs/tab1']);
    }
  }

  public async signin() {
    try {
      await this.authS.loginwithEmail(this.person.email,this.person.password);
      //this.router.navigate(['private/tabs/tab1']); configurar rutas
    } catch (err) {
      console.error(err);
    }
  }


}
