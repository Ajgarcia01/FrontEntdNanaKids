import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-modal-add-kid',
  templateUrl: './modal-add-kid.page.html',
  styleUrls: ['./modal-add-kid.page.scss'],
})
export class ModalAddKidPage implements OnInit {
  @ViewChild(IonDatetime)datetime:IonDatetime
  selectecMode='date';
  showPicker=false;
  dateValue= format(new Date(),'yyy-MM-dd') + 'T09:00:00.000Z';
  formattedString='';
  public formKid:FormGroup;

  
  constructor(private fb:FormBuilder) {

 
    this.formKid=this.fb.group({
      name:["",Validators.required],
      gender:[""],
      birth_date:[""],
    });

    this.setToday();

   }


   setToday(){
     this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')+'T09:00:00.00Z'),'HH:mm,MMM d, yyyy');
   }
  ngOnInit() {
  }

  dateChanged(value)
  {
    this.dateValue=value;
    this.formattedString= format(parseISO(value),'HH:mm,MMM d, yyyy');
      console.log(value);
  }

  close(){
    this.datetime.cancel(true);
  }

  select(){
    this.datetime.confirm(true);
  }

}
