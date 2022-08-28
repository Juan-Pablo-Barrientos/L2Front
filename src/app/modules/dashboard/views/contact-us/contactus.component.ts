import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule,FormControlDirective, Validators } from '@angular/forms';
import { DataService } from '@gdp/shared/services';

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


  constructor(private dataService : DataService){


  }

  reset() {
    this.contactForm.reset();
  }

  onSubmit(){
    let request = {
      firstName : this.contactForm.controls.firstNameControl.value,
      comment : this.contactForm.controls.commentControl.value,
    }
    this.dataService.addUser(request).subscribe(response => {
      console.log(response);
    });
  }

}
