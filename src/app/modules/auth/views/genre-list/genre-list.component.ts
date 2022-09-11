import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { DataService } from '@gdp/shared/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'gdp-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {
  faTrash = faTrash;
  faPencil = faPencil;
  faEye = faEye;
  closeResult = '';
  genres:any;
  editGenreForm: any;
  createGenreForm:any

  constructor(private modalService: NgbModal, private dataService: DataService, private router:Router, private toastr:ToastrService) {

  }


 ngOnInit(): void {

   this.dataService.getGenres().subscribe((response:any)=>{
     this.genres=response;
   })


   this.createGenreForm=new FormGroup({
     nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
   });


 }

 onSubmit(){
   let request = {
     name : this.createGenreForm.controls.nameControl.value,
   }
   this.dataService.addGenre(request).subscribe({
     next : (res)=>{
       this.toastr.success('Se ha creado el genero', 'Exito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.genres.unshift(res.body);
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==201){
       this.toastr.success('Se ha creado el genero', 'Exito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshGenreList();
     }else {
       this.toastr.error('Fallo el formulario', ':(',{positionClass:'toast-bottom-right'})
     }}
    });
 }

 openCreate(content: any) {
   this.resetCreate();
   this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
 }

 resetCreate() {
   this.createGenreForm.reset();
 }

 onSubmitEdit() {
   let request = {
     id : this.editGenreForm.controls.idControl.value,
     name : this.editGenreForm.controls.nameControl.value,
   }
   this.dataService.editGenre(request,this.editGenreForm.controls.idControl.value).subscribe({
     next : ()=>{
       this.toastr.success('Se ha editado el genero', 'Exito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshGenreList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha editado el genero', 'Exito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshGenreList();
     }else {
       this.toastr.error('Fallo el formulario', ':(',{positionClass:'toast-bottom-right'})
     }}
    })
 }

 openShow(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
 }

 openEdit(content: any, idGenre:number) {
   const genre = this.genres.find((genre: { id: number; }) =>genre.id===idGenre)
   this.editGenreForm = new FormGroup({
     idControl:new FormControl({value:genre.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
     nameControl:new FormControl(genre.name,{validators: [Validators.required,Validators.maxLength(50)]}),
   })
   this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
 }

 openDelete(content: any) {
   this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
 }

 deleteGenre(idGenre:number){
   this.dataService.delGenre(idGenre).subscribe({
     next : ()=>{
       this.toastr.success('Se ha borrado el genero', 'Exito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshGenreList();
     },
     error: (error: HttpErrorResponse) => {
     if (error.status==200){
       this.toastr.success('Se ha borrado el genero', 'Exito',{positionClass:'toast-bottom-right'})
       this.modalService.dismissAll();
       this.refreshGenreList();
     }else {
      this.toastr.success('Se ha borrado el genero', 'Exito',{positionClass:'toast-bottom-right'})
      this.modalService.dismissAll();
      this.refreshGenreList();
       //this.toastr.error('Fallo el formulario', ':(',{positionClass:'toast-bottom-right'})
     }}
    })
 }

 searchGenre() {
   let searchGenre:any, filter:any, table:any, tr:any, td, i, txtValue;
   searchGenre = document.getElementById("searchGenre");
   filter = searchGenre.value.toUpperCase();
   table = document.getElementById("genreList");
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


 refreshGenreList(){
   this.dataService.getGenres().subscribe((response:any)=>{
     this.genres=response;
 })}
}

