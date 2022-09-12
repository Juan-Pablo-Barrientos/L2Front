import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule,FormControlDirective, Validators } from '@angular/forms';

//Services
import { DataService } from '@gdp/shared/services';
import { ToastrService } from 'ngx-toastr';

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


  constructor(private dataService : DataService, private toastr:ToastrService){


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
    this.dataService.addContact(request).subscribe((res:any) => {
      if (res.status==201){
        this.toastr.success('Mensaje enviado :)', 'Éxito',{positionClass:'toast-bottom-right'});
        this.contactForm.reset();
      }else{
        this.toastr.error('Error al enviar el formulario', '🥺',{positionClass:'toast-bottom-right'});
      }
    });
  }

}
