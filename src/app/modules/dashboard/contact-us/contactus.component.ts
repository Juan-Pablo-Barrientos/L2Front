import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule,FormControlDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

  contactForm=new FormGroup({
    firstNameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    commentControl: new FormControl('',[Validators.required, Validators.maxLength(255)]),
  });

  constructor(){

    this.contactForm.valueChanges.subscribe(value => console.log(value))

  }

  reset() {
    this.contactForm.reset();
  }

  onSubmit(){
  }

}
