import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@gdp/shared/services';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';

@Component({
  selector: 'gdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  closeResult = '';
  model: NgbDateStruct;
  users:any;
  editUserForm: any;


  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router) {

   }

  ngOnInit(): void {

    this.dataService.getUsers().subscribe((response:any)=>{
      this.users=response;
      console.log(response)
    })

  }

  onSubmit() {
    let request = {
      id : this.editUserForm.controls.idControl.value,
      username : this.editUserForm.controls.usernameControl.value,
      name : this.editUserForm.controls.firstnameControl.value,
      lastname : this.editUserForm.controls.lastnameControl.value,
      email : this.editUserForm.controls.emailControl.value,
      dni : this.editUserForm.controls.dniControl.value,
      rol: this.editUserForm.controls.role.value==="Admin" ? 1 : 0,
    }
    console.log(request)
    this.dataService.editUser(request,this.editUserForm.controls.idControl.value).subscribe(response => {
      console.log(response);
    });
    window.location.reload()
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }

  openEdit(content: any, idUser:number) {
    const user = this.users.find((user: { id: number; }) =>user.id===idUser)
    const role = user.rol ? "Admin":"Client"
    this.editUserForm = new FormGroup({
      idControl:new FormControl({value:user.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
      usernameControl:new FormControl(user.username,{validators: [Validators.required,Validators.maxLength(50)],/* asyncValidators: this.validateUser.bind(this), updateOn: 'blur'*/}),
      firstnameControl:new FormControl(user.firstname,[Validators.required,Validators.maxLength(50)]),
      lastnameControl:new FormControl(user.lastname,[Validators.required,Validators.maxLength(50)]),
      emailControl:new FormControl(user.email,[Validators.required,Validators.maxLength(50),Validators.email]),
      dniControl:new FormControl(user.dni,[Validators.required,Validators.maxLength(50)]),
      role:new FormControl(role,[Validators.required]),
    })
    this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }

  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }

  deleteUser(idUser:number){
    this.dataService.delUser(idUser).subscribe()
    window.location.reload()
  }

}
