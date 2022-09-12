import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { faTrash, faEye, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons';

//Services
import { DataService } from '@gdp/shared/services';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gdp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  faTrash = faTrash;
  faPencil = faPencil;
  faEye = faEye;
  closeResult = '';
  model: NgbDateStruct;
  users:any;
  editUserForm: any;


  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router, private toastr:ToastrService) {

   }

   refreshUserList(){
    this.dataService.getUsers().subscribe((response:any)=>{
      this.users=response;
    })
  }

  ngOnInit(): void {

    this.dataService.getUsers().subscribe((response:any)=>{
      this.users=response;
    })

  }

  onSubmit() {
    let request = {
      id : this.editUserForm.controls.idControl.value,
      username : this.editUserForm.controls.usernameControl.value,
      firstname : this.editUserForm.controls.firstnameControl.value,
      lastname : this.editUserForm.controls.lastnameControl.value,
      email : this.editUserForm.controls.emailControl.value,
      dni : this.editUserForm.controls.dniControl.value,
      rol: this.editUserForm.controls.role.value==="Admin" ? 1 : 0,
    }
    this.dataService.editUser(request,this.editUserForm.controls.idControl.value).subscribe({
      next : ()=>{
        this.toastr.success('El editado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        this.toastr.success('El editado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      }else {
        this.toastr.error('Error al editar usuario', '🥺',{positionClass:'toast-bottom-right'});
      }}
     })
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
    this.dataService.delUser(idUser).subscribe({
      next : ()=>{
        this.toastr.success('El borrado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        this.toastr.success('El borrado de usuario fue exitoso', 'Éxito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
        this.refreshUserList();
      }else {
        this.toastr.error('Error al borrar el usuario', '🥺',{positionClass:'toast-bottom-right'});
      }}
     })
  }

  searchUser() {
    let searchUser:any, filter:any, table:any, tr:any, td, i, txtValue;
    searchUser = document.getElementById("searchUser");
    filter = searchUser.value.toUpperCase();
    table = document.getElementById("userList");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

}
