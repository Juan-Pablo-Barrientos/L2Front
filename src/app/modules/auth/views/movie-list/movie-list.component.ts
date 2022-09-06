import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';


import { DataService } from '@gdp/shared/services';
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
  addShowForm:any;
  theaters:any
  minDate:string;
  maxDate:string;
  now = new Date();
  times:any;
  titleSearch:any='';
  id_genre:any;
  timesIncoming: any;

  constructor(private modalService: NgbModal ,private dataService:DataService, private authService:AuthService) { }

  get getCreateMovieForm(){
    return this.createMovieForm.controls;
  }
  get getEditMovieForm(){
    return this.editMovieForm.controls;
  }
  get getAddShowForm(){
    return this.addShowForm.controls;
  }

  refreshMovieList(){
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??= "").subscribe((response:any)=>{
      this.movies=response;
    })
  }

  ngOnInit(): void {
    this.minDate=new Date().toISOString().split('T')[0];
    this.maxDate=new Date(this.now.setMonth(this.now.getMonth() + 1)).toISOString().split('T')[0];


    this.createMovieForm=new FormGroup({
      nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      synopsisControl: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      genreControl: new FormControl('',[Validators.required]),
      directorControl: new FormControl('',[Validators.required]),
      hoursControl: new FormControl('',[Validators.required]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      format: new FormControl('', [Validators.required])
    });

    this.dataService.getTheaters().subscribe((response:any)=>{
      this.theaters=response;
    })

    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??= "").subscribe((response:any)=>{
      this.movies=response;
      console.log(this.movies)
    })

    this.dataService.getGenres().subscribe((response:any)=>{
      this.genres=response;
    })

    this.dataService.getDirectors().subscribe((response:any)=>{
      this.directors=response;
    })

  }
  resetCreate() {
    this.createMovieForm.reset();
    this.createMovieForm.controls['genreControl'].setValue('')
    this.createMovieForm.controls['hoursControl'].setValue('')
    this.createMovieForm.controls['directorControl'].setValue('')
  }
  resetAddShow() {
    this.addShowForm.controls['theaterShowControl'].setValue('')
    this.addShowForm.controls['dayShowControl'].setValue('')
    this.addShowForm.controls['timeShowControl'].setValue('')
  }

  onSubmit(){
    const formData = new FormData()
    formData.append('myImage',this.createMovieForm.get('fileSource').value);
    formData.append('name',this.createMovieForm.controls['nameControl'].value);
    formData.append('synopsis',this.createMovieForm.controls['synopsisControl'].value );
    formData.append('id_director',this.createMovieForm.controls['genreControl'].value );
    formData.append('id_genre',this.createMovieForm.controls['directorControl'].value );
    formData.append('duration',this.createMovieForm.controls['hoursControl'].value );
    formData.append('format_movie',this.createMovieForm.controls['format'].value );
    formData.append('id_usr',(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!)).id_user );

    this.dataService.addMovie(formData).subscribe({
      next : ()=>{
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshMovieList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==201){
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshMovieList();
      }else {
        alert("Error al enviar el formulario")
      }}
     });
  }

  deleteMovie(idMovie:number){
    this.dataService.delMovie(idMovie).subscribe({
      next : ()=>{
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshMovieList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshMovieList();
      }else {
        alert("Error al enviar el formulario")
      }}
     })
  }


  onSubmitEdit(){
    const formData = new FormData()
    formData.append('myImage',this.editMovieForm.get('fileSourceEdit').value);
    formData.append('name',this.editMovieForm.controls['nameEditControl'].value);
    formData.append('synopsis',this.editMovieForm.controls['synopsisEditControl'].value );
    formData.append('id_director',this.editMovieForm.controls['genreEditControl'].value );
    formData.append('id_genre',this.editMovieForm.controls['directorEditControl'].value );
    formData.append('duration',this.editMovieForm.controls['hoursEditControl'].value );
    formData.append('format_movie',this.editMovieForm.controls['format'].value );
    formData.append('id_usr',(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!)).id_user );

    this.dataService.editMovie(formData,this.editMovieForm.get('idEditControl').value).subscribe({
      next : ()=>{
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshMovieList();
      },
      error: (error: HttpErrorResponse) => {
      if (error.status==200){
        alert("Exito");
        this.modalService.dismissAll();
        this.refreshMovieList();
      }else {
        alert("Error al enviar el formulario")
      }}
     });
  }



  openShow(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalShow'}).result
  }
  openEdit(content: any,idMovie:number) {
  const movie = this.movies.find((movie: { id: number; }) =>movie.id===idMovie)
  this.currentImagePath=movie.path_img;
  this.editMovieForm = new FormGroup({
    idEditControl:new FormControl({value:movie.id,disabled:true},[Validators.required,Validators.maxLength(50)]),
    nameEditControl: new FormControl(movie.name,[Validators.required, Validators.maxLength(50)]),
    synopsisEditControl: new FormControl(movie.synopsis,[Validators.required]),
    genreEditControl: new FormControl(movie.id_genre,[Validators.required]),
    directorEditControl: new FormControl(movie.id_director,[Validators.required]),
    hoursEditControl: new FormControl(movie.duration,[Validators.required]),
    fileEdit: new FormControl(''),
    fileSourceEdit: new FormControl(''),
    format: new FormControl(movie.format_movie, [Validators.required])
  })
  this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }

  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }
  openCreate(content: any) {
    this.resetCreate();
    this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
  }
  openAddShows(content: any, idMovie:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalAddShow'}).result
    this.addShowForm = new FormGroup({
    idMovieControl:new FormControl({value:idMovie,disabled:true},[Validators.required,Validators.maxLength(50)]),
    theaterShowControl: new FormControl('',[Validators.required]),
    dayShowControl: new FormControl('',[Validators.required]),
    timeShowControl: new FormControl('',[Validators.required])
  })
  this.resetAddShow();
}

onSubmitAddShow(){
  const date_time= this.addShowForm.controls.dayShowControl.value.concat(" ").concat(this.addShowForm.controls.timeShowControl.value).concat(":00")
  console.log(date_time)
  let request = {
    date_time : date_time,
    tickets_availables : 200,
    id_movie : this.addShowForm.controls.idMovieControl.value,
    id_theaters : this.addShowForm.controls.theaterShowControl.value,
  }
  console.log(request.date_time)
  this.dataService.addShow(request).subscribe(response => {
    console.log(response);
    if (response.status==201){
      alert("Exito");
      this.addShowForm.reset();
    }else{
      alert("Fallo el envio del formulario")
    }
  });

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
      console.log("tamo aca")
      this.editMovieForm.patchValue({
        fileSourceEdit: file
      })}
     }
  }

  onDateChange(){
    this.times=null
    if(this.addShowForm.controls['theaterShowControl'].value && this.addShowForm.controls['dayShowControl'].value){
      let Idtheater = this.addShowForm.controls['theaterShowControl'].value
      let day = (this.addShowForm.controls['dayShowControl'].value)
      let request = {
        theater:Idtheater,
        date_time:day
      }
      console.log(request)
      console.log("before sub")
      this.dataService.getShowsByDayAndTheaters(request).subscribe((response:any)=>{
      this.timesIncoming=response;
      console.log(response)
      this.times=[
        {
          time:"17:00"
        },
        {
          time:"20:00"
        },
        {
          time:"23:00"
        },
      ]
      this.timesIncoming.forEach((timeIncoming:any,j:any) => {
        this.times.forEach((time:any,i:any)  => {
          console.log(timeIncoming)
          let timeIncomingAux = timeIncoming
          if(timeIncomingAux.date_time.length >8){
          timeIncomingAux.date_time=timeIncomingAux.date_time.slice(11,16)
          }
          if (time.time===timeIncomingAux.date_time){
            const indexToRemove=this.times.indexOf(time)
            this.times.splice(indexToRemove,1)
          }
        });
      })
      if(this.times.length==0) {alert("No hay mas funciones disponibles para ese dia")}
      })
    }
  }

  searchMovie() {
    let searchMovie:any, filter:any, table:any, tr:any, td, i, txtValue;
    searchMovie = document.getElementById("searchMovie");
    filter = searchMovie.value.toUpperCase();
    table = document.getElementById("movieList");
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
