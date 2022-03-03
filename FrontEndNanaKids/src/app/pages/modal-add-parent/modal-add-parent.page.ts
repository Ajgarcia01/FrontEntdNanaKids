import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Parent } from 'src/app/model/Parent';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-modal-add-parent',
  templateUrl: './modal-add-parent.page.html',
  styleUrls: ['./modal-add-parent.page.scss'],
})
export class ModalAddParentPage implements OnInit {
  public formParent: FormGroup;
  private selectedOption: number; //select gender
  private gender: boolean;

  constructor(private fb: FormBuilder, private modalController: ModalController, private apiparent: ClientService) {

    this.formParent = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1)
      ])],
      dni: ["", Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]{8}[A-Za-z]{1}")
      ])],

      email: ["", Validators.compose([
        Validators.required,
        Validators.email
      ])],
      phone: ["", Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ])],
      surname: [""],
      type: [""]
    });
  }

  ngOnInit() {
  }

  /**
  * 
  * @param event 
  */
  notifyChange(event: CustomEvent) {
    this.selectedOption = event.detail.value;
    if (this.selectedOption == 1) {
      this.gender = true;
    } else {
      this.gender = false;
    }
    console.log(this.selectedOption);
  }

  public validar(parent: Parent): boolean {
    if (parent.name.length >= 1) {
      return true;
    }
    console.log(parent.name.length);
  }
  public async createParent() {

    let newParent: Parent = {
      name: this.formParent.get("name").value,
      dni: this.formParent.get("dni").value,
      email: this.formParent.get("email").value,
      phone: this.formParent.get("phone").value,
      surname: this.formParent.get("surname").value,
      kids: [],
      type: this.gender,
      id: -1
    }
    try {
        await this.apiparent.CreateClient(newParent);  
    }catch (err) {
      console.log(err);
    }

  }

  async exit() {
    await this.modalController.dismiss(null, 'cancel');
  }
}
