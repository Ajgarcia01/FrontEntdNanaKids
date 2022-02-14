import { Component, OnInit } from '@angular/core';
import { Kid } from '../model/Kid';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  users:any
  person:Kid
  kids:Kid[]=[]
  gender: boolean = true
  constructor(private api:ApiService) {}


  async ionViewDidEnter(){
    
    await this.getKids();
    
  }

  public async getKids(){
    this.kids=[];
    this.kids=await this.api.getKid();

    
  }


}
