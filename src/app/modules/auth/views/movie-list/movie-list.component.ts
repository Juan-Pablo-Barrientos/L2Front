import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '@gdp/shared/services';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal ,private dataService:DataService) { }

  get getCreateMovieForm(){
    return this.createMovieForm.controls;
  }

  ngOnInit(): void {

    this.createMovieForm=new FormGroup({
      nameControl: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      synopsisControl: new FormControl('',[Validators.required, Validators.maxLength(255)]),
      genreControl: new FormControl('',[Validators.required]),
      directorControl: new FormControl('',[Validators.required]),
      hoursControl: new FormControl('',[Validators.required]),
      minutesControl: new FormControl('',[Validators.required]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
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
  reset() {
    this.createMovieForm.reset();
    this.createMovieForm.controls['genreControl'].setValue('')
    this.createMovieForm.controls['hoursControl'].setValue('')
    this.createMovieForm.controls['minutesControl'].setValue('')
    this.createMovieForm.controls['directorControl'].setValue('')
  }

  onSubmit(){
    const headers = new HttpHeaders({
      Authentication:''
    })

    const payload = {
      name : this.createMovieForm.controls['nameControl'].value,
      synopsis : this.createMovieForm.controls['synopsisControl'].value,
      id_director : this.createMovieForm.controls['genreControl'].value,
      id_genre : this.createMovieForm.controls['directorControl'].value,
      duration : (this.createMovieForm.controls['hoursControl'].value.concat(":")).concat(this.createMovieForm.controls['minutesControl'].value)
    }

    const formData = new FormData()
    formData.append('imgFile',this.createMovieForm.get('fileSource').value)
    formData.append('payload',JSON.stringify(payload))

    console.log(formData)
    console.log(formData.get('payload'))
    console.log(formData.get('imgFile'))

    this.dataService.addMovie(formData).subscribe((res:any) => {console.log(res)
      if (res.status==201){
        alert("Exito");
        this.createMovieForm.reset();
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
  openEdit(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalEdit'}).result
  }
  openDelete(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalDelete'}).result
  }
  openCreate(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modalCreate'}).result
  }

  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createMovieForm.patchValue({
        fileSource: file
      });
    }
  }
}
