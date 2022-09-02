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
    emailControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    phoneControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    commentControl: new FormControl('',[Validators.required, Validators.maxLength(255)]),
  });


  constructor(private dataService : DataService){


  }

  reset() {
    this.contactForm.reset();
  }

  onSubmit(){
    let request = {
      phone_number : this.contactForm.controls.phoneControl.value,
      email : this.contactForm.controls.emailControl.value,
      textarea : this.contactForm.controls.commentControl.value,
    }
    this.dataService.addContact(request).subscribe((res:any) => {console.log(res)
      if (res.status==201){
        alert("Exito");
        this.contactForm.reset();
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }

}
