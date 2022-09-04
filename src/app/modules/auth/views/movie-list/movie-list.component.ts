import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@gdp/shared/services';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'gdp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  closeResult = '';
  movies:any;
  createMovieForm:any
  genres:any;
  directors:any;
  editMovieForm:any;
  currentImagePath:any;

  constructor(private modalService: NgbModal ,private dataService:DataService, private authService:AuthService) { }

  get getCreateMovieForm(){
    return this.createMovieForm.controls;
  }
  get getEditMovieForm(){
    return this.editMovieForm.controls;
  }

  ngOnInit(): void {

    this.createMovieForm=new FormGroup({
      nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      synopsisControl: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      genreControl: new FormControl('',[Validators.required]),
      directorControl: new FormControl('',[Validators.required]),
      hoursControl: new FormControl('',[Validators.required]),
/*       minutesControl: new FormControl('',[Validators.required]), */
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      format: new FormControl('', [Validators.required])
    });

    this.dataService.getMovies().subscribe((response:any)=>{
      this.movies=response;
      console.log(response)
    })

    this.dataService.getGenres().subscribe((response:any)=>{
      this.genres=response;
      console.log(response)
    })

    this.dataService.getDirectors().subscribe((response:any)=>{
      this.directors=response;
      console.log(response)
    })

  }
  resetCreate() {
    this.createMovieForm.reset();
    this.createMovieForm.controls['genreControl'].setValue('')
    this.createMovieForm.controls['hoursControl'].setValue('')
/*     this.createMovieForm.controls['minutesControl'].setValue('') */
    this.createMovieForm.controls['directorControl'].setValue('')
  }

  onSubmit(){
/*     const payload = {
      name : this.createMovieForm.controls['nameControl'].value,
      synopsis : this.createMovieForm.controls['synopsisControl'].value,
      id_director : this.createMovieForm.controls['genreControl'].value,
      id_genre : this.createMovieForm.controls['directorControl'].value,
      duration : (this.createMovieForm.controls['hoursControl'].value.concat(":")).concat(this.createMovieForm.controls['minutesControl'].value),
      format_movie:this.createMovieForm.controls['format'].value,
      id_usr:(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!)).id_user
    } */
      /* Saque este payload porque iba a ser dificil trabajar con un JSON en el back, habria que cambiar en el metodo edit */
    const formData = new FormData()
    formData.append('myImage',this.createMovieForm.get('fileSource').value);
    formData.append('name',this.createMovieForm.controls['nameControl'].value);
    formData.append('synopsis',this.createMovieForm.controls['synopsisControl'].value );
    formData.append('id_director',this.createMovieForm.controls['genreControl'].value );
    formData.append('id_genre',this.createMovieForm.controls['directorControl'].value );
    formData.append('duration',this.createMovieForm.controls['hoursControl'].value );
    formData.append('format_movie',this.createMovieForm.controls['format'].value );
    formData.append('id_usr',(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!)).id_user );


    console.log(formData)
    console.log(formData.get('payload'))
    console.log('MI',formData.get('na'))

    this.dataService.addMovie(formData).subscribe((res:any) => {console.log(res)
      if (res.status==201){
        alert("Exito");
        this.createMovieForm.resetCreate();
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }

  deleteMovie(idMovie:number){
    this.dataService.delMovie(idMovie).subscribe()
    window.location.reload()
  }

  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }
  openEdit(content: any,idMovie:number) {
  const movie = this.movies.find((movie: { id: number; }) =>movie.id===idMovie)
  this.currentImagePath=movie.path_img;
  this.editMovieForm = new FormGroup({
    nameEditControl: new FormControl(movie.name,[Validators.required, Validators.maxLength(50)]),
    synopsisEditControl: new FormControl(movie.synopsis,[Validators.required, Validators.maxLength(255)]),
    genreEditControl: new FormControl(movie.id_genre,[Validators.required]),
    directorEditControl: new FormControl(movie.id_director,[Validators.required]),
    hoursEditControl: new FormControl(movie.duration.substring(0,2),[Validators.required]),
    minutesEditControl: new FormControl(movie.duration.substring(3,5),[Validators.required]),
    fileEdit: new FormControl(''),
    fileSourceEdit: new FormControl(''),
    format: new FormControl(movie.format_movie, [Validators.required])
  })
  this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }

  onSubmitEdit(){
    const payload = {
      name : this.editMovieForm.controls['nameEditControl'].value,
      synopsis : this.editMovieForm.controls['synopsisEditControl'].value,
      id_director : this.editMovieForm.controls['genreEditControl'].value,
      id_genre : this.editMovieForm.controls['directorEditControl'].value,
      duration : (this.editMovieForm.controls['hoursEditControl'].value.concat(":")).concat(this.editMovieForm.controls['minutesEditControl'].value),
      format_movie:this.editMovieForm.controls['format'].value,
      id_usr:(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!)).id_user
    }

    const formData = new FormData()
    formData.append('imgFile',this.editMovieForm.get('fileSourceEdit').value)
    formData.append('payload',JSON.stringify(payload))

    console.log(formData)
    console.log(formData.get('payload'))
    console.log(formData.get('imgFile'))

    this.dataService.addMovie(formData).subscribe((res:any) => {console.log(res)
      if (res.status==201){
        alert("Exito");
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }

  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }
  openCreate(content: any) {
    this.resetCreate();
    this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
  }

  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      if(event.target.files[0].size > 4097152){
      alert("File is too big!");
      event.target.value = null;
      event.target.files[0] = "";
      this.createMovieForm.patchValue({
        fileSource: ""
      })}
   else{
      const file = event.target.files[0];
      this.createMovieForm.patchValue({
        fileSource: file
      })}
    }
  }
  onEditFileChange(event:any) {
    if(event.target.files.length > 0){
    if(event.target.files[0].size > 4097152){
      alert("File is too big!");
      event.target.value = null;
      event.target.files[0] = "";
      this.editMovieForm.patchValue({
        fileSourceEdit: ""
      })}
     else{
      const file = event.target.files[0];
      this.editMovieForm.patchValue({
        fileSourceEdit: file
      })}
     }
  }
}
