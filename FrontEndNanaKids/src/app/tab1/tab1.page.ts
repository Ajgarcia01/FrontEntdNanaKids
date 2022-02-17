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
  searchedUser:any;
  person:Kid
  kids:Kid[]=[]
  gender: boolean = true
  constructor(private api:ApiService) {}

  /**
   * 
   */
  async ionViewDidEnter(){
    
    await this.getKids();
    this.searchedUser=this.kids;
    
    
  }
  /**
   * 
   */
  public async getKids(){
    this.kids=[];
    this.kids=await this.api.getKid();

    
  }

  /**
   * 
   * @param kid 
   */

  public async deleteKid(kid:Kid){
   
    this.api.deleteKid(kid);
  }

  /**
   * 
   * @param event 
   * 
   */

  public buscar(event){
    console.log(event);
    const text=event.target.value;
    this.searchedUser=this.kids;
    if(text && text.trim() != ''){
      this.searchedUser=this.searchedUser.filter((kid:Kid)=>{
        return (kid.name.toLowerCase().indexOf(text.toLowerCase()) > -1);

      })
    }
  }

}