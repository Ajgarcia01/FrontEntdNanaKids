import { Component, OnInit, ViewChild } from '@angular/core';
import { format, parseISO } from 'date-fns';
import { Felicitation } from '../model/Felicitation';
import { Kid } from '../model/Kid';
import { messsage } from '../model/message';
import { Parent } from '../model/Parent';
import { ClientService } from '../services/client.service';
import { FelicitationService } from '../services/felicitation.service';
import { KidService } from '../services/kid.service';
import { MessageService } from '../services/message.service';

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
  par:Parent
  felicitaciones:Felicitation []=[]
  constructor(private feliSer:FelicitationService,private messageApi:MessageService,private kid:KidService) { 
    this.setToday();
  }

  ngOnInit() {
    this.countFelicitation();
    console.log(this.countFelicitation()+'HOLA');
    
  }


  ionViewDidEnter(){
    this.getFelicitations();
    this.estadodelenvio='NO ENVIADO'
    this.countFelicitation();
    console.log(this.countFelicitation());
  }

  getPadres(){
  }

 
  async sendMessage(){
    let padre: Parent = {
      id:  5,
      dni: '49832392V',
      type: false,
      name: "Jesús",
      phone: '+34697970637',
      email: "jesusgarcialuque11@gmail.com",
      surname: "García Luque",
      kids: [],
      admin:{
        id: 1,
        user: "Eduardo",
        password: "1234",
        email: "educar200@gmail.com"
      }
    }
    
    let kid: Kid ={
      id:20,
      name: "Juan Moreno Moreno",
      gender:true,
      birthDate:'2002-03-01',
      client: [],
      felicitations: []
    }

    let feli : Felicitation ={
      type:1,
      kid: kid,
      estate:false,
      image:"http://res.cloudinary.com/dcbl6rgf5/image/upload/v1646817268/pdee9ieusjqkiesdgvz4.jpg",
      dateSend: '2022-03-01',
      id:10
    }

    
    

    let newmessage:messsage={
      message: 'Felicidades Pedro',
      urlImage: 'https://image.shutterstock.com/image-vector/congratulations-paper-banner-color-confetti-260nw-401555809.jpg',
      client: padre,
      felicitation: feli
    }

    await this.messageApi.sendMessage(newmessage).then(d=>{
      console.log(d);
      
    });
  }

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')),'yyyy-MM-dd');
  }


  countFelicitation(){
    this.feliSer.getCount().then(data=>{
      this.count=data;
      console.log(data+'hola');
      
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


