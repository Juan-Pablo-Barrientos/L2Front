import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@gdp/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gdp-directors-list',
  templateUrl: './directors-list.component.html',
  styleUrls: ['./directors-list.component.scss']
})
export class DirectorsListComponent implements OnInit {
  closeResult = '';
  directors:any;
  editDirectorForm: any;
  createDirectorForm:any


  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router) {

   }


  ngOnInit(): void {

    this.dataService.getDirectors().subscribe((response:any)=>{
      this.directors=response;
    })


    this.createDirectorForm=new FormGroup({
      nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      lastnameControl: new FormControl('',[Validators.required, Validators.maxLength(50)])
    });


  }

  onSubmit(){
    let request = {
      name : this.createDirectorForm.controls.nameControl.value,
      lastname : this.createDirectorForm.controls.lastnameControl.value,
    }
    this.dataService.addDirector(request).subscribe({
      next : ()=>{
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshDirectorList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==201){
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshDirectorList();
      }else {
        alert("Error al enviar el formulario")
      }}
     });
  }

  openCreate(content: any) {
    this.resetCreate();
    this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
  }

  resetCreate() {
    this.createDirectorForm.reset();
  }

  onSubmitEdit() {
    let request = {
      id : this.editDirectorForm.controls.idControl.value,
      name : this.editDirectorForm.controls.nameControl.value,
      lastname : this.editDirectorForm.controls.lastnameControl.value,
    }
    console.log(request)
    this.dataService.editDirector(request,this.editDirectorForm.controls.idControl.value).subscribe({
      next : ()=>{
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshDirectorList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshDirectorList();
      }else {
        alert("Error al enviar el formulario")
      }}
     })
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }

  openEdit(content: any, idDirector:number) {
    const director = this.directors.find((director: { id: number; }) =>director.id===idDirector)
    this.editDirectorForm = new FormGroup({
      idControl:new FormControl({value:director.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
      nameControl:new FormControl(director.name,{validators: [Validators.required,Validators.maxLength(50)]}),
      lastnameControl:new FormControl(director.lastname,[Validators.required,Validators.maxLength(50)]),
    })
    this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }

  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }

  deleteDirector(idDirector:number){
    this.dataService.delDirector(idDirector).subscribe({
      next : ()=>{
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshDirectorList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshDirectorList();
      }else {
        alert("Error al enviar el formulario")
      }}
     })
  }

  searchDirector() {
    let searchDirector:any, filter:any, table:any, tr:any, td, i, txtValue;
    searchDirector = document.getElementById("searchDirector");
    filter = searchDirector.value.toUpperCase();
    table = document.getElementById("directorList");
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


  refreshDirectorList(){
    this.dataService.getDirectors().subscribe((response:any)=>{
      this.directors=response;
  })}
}