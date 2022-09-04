import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  ngOnInit(): void {
    this.minDate=new Date().toISOString().split('T')[0];
    this.maxDate=new Date(this.now.setMonth(this.now.getMonth() + 1)).toISOString().split('T')[0];

    this.theaters=[
      {
        id:1
      },
      {
        id:2
      },
      {
        id:3
      },
      {
        id:4
      },
      {
        id:5
      },
      {
        id:6
      },
    ]


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

    this.dataService.addMovie(formData).subscribe((res:any) => {console.log(res)
      if (res.status==201){
        alert("Exito");
        window.location.reload()
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }

  deleteMovie(idMovie:number){
    this.dataService.delMovie(idMovie).subscribe()
    window.location.reload()
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

    this.dataService.editMovie(formData,this.editMovieForm.get('idEditControl').value).subscribe((res:any) => {console.log(res)
      if (res.status==200){
        alert("Exito");
        window.location.reload()
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }

  onSubmitAddShow(){
    return null
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
    console.log(this.theaters)
    this.addShowForm = new FormGroup({
    idShowControl:new FormControl({value:idMovie,disabled:true},[Validators.required,Validators.maxLength(50)]),
    theaterShowControl: new FormControl('',[Validators.required]),
    dayShowControl: new FormControl('',[Validators.required]),
    timeShowControl: new FormControl('',[Validators.required])
  })

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
      let day = this.addShowForm.controls['dayShowControl'].value
      console.log("getHours")
      let request = {
        theaterId:Idtheater,
        day:day
      }

      this.dataService.getShowsByDayAndTheaters(request)

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

    }
  }

}
