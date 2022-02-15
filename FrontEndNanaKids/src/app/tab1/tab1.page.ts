import { Component, OnInit } from '@angular/core';
import { Kid } from '../model/Kid';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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

  public async deleteKid(kid:Kid){
   
    this.api.deleteKid(kid);
  }


}