import { Component, OnInit, ViewChild } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { Felicitation } from '../model/Felicitation';
import { FelicitationService } from '../services/felicitation.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  formattedString='';
  estadodelenvio='';
  count:Number []=[];
  fel:Felicitation;
  felicitaciones:Felicitation []=[]
  constructor(private feliSer:FelicitationService) { 
    this.setToday();
  }

  ionViewDidEnter(){
    this.getFelicitations();
    this.estadodelenvio='NO ENVIADO'
  }

  ngOnInit() {
    this.countFelicitation();
  }


  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')),'yyyy-MM-dd');
  }


  countFelicitation(){
    this.feliSer.getCount().then(data=>{
      this.count=data;
      console.log(data);
      
    }).catch(err=>{
      console.log(err);
      
    });
  }

  getFelicitations(){
    this.feliSer.getFelicitations().then(data=>{
      this.felicitaciones=data;
     console.log(data);
    
    }).catch(err=>{
      console.log(err);
    });
  }



  

}
