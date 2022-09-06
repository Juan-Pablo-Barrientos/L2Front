import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import {Title} from "@angular/platform-browser";

import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { DataService } from '@gdp/shared/services';
import { empty } from 'rxjs';

@Component({
  selector: 'gdp-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie:any;
  buyTicketsForm:any;
  theaters:any;
  times:any;
  shows:any=[];
  loggedUser:any;
  ratingIMDB:any;

  constructor(private dataService: DataService, private route: ActivatedRoute, private modalService: NgbModal, private authService:AuthService, private titleService:Title) {

    this.dataService.getMovie(this.route.snapshot.params['id']).subscribe((res:any) => {
      this.movie = res;
      this.titleService.setTitle(this.movie.name);
      this.dataService.getMovieRating(this.movie.name).subscribe((res:any)=>{
        this.ratingIMDB=res.Ratings[0].Value
        })
    })

   }

  getBuyTicketsForm(){
    return this.buyTicketsForm.controls
  }

  ngOnInit(): void {
      this.dataService.getTheaters().subscribe((res:any)=>
      this.theaters=res
       )
       if (this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).id_user){
        this.dataService.getUser(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).id_user).subscribe(
          (res:any) => this.loggedUser=res

        )
      }

    }



  openBuyTickets(content: any,) {
    this.getShows()
    this.buyTicketsForm=new FormGroup({
      showControl: new FormControl('',[Validators.required,]),
      theaterControl: new FormControl('',[Validators.required,]),
      dniControl: new FormControl('',[Validators.required,]),
      emailControl: new FormControl('',[Validators.required,Validators.email]),
      quantityControl: new FormControl('',[Validators.required,Validators.max(12),Validators.min(1)])
    });
    if (this.loggedUser){
      this.buyTicketsForm.controls.emailControl.value=this.loggedUser.email
      this.buyTicketsForm.controls.emailControl.disable()
      this.buyTicketsForm.controls.dniControl.value=this.loggedUser.dni
      this.buyTicketsForm.controls.dniControl.disable()
    }
    this.buyTicketsForm.controls.theaterControl.disable()
    this.modalService.open(content, {ariaLabelledBy: 'modalBuyTicket'}).result
  }

  onSubmitBuyTickets(){
    let request = {
      id_show : this.buyTicketsForm.controls.showControl.value,
      dni : this.buyTicketsForm.controls.dniControl.value,
      status: false,
      code: "123ABC",
      email : this.buyTicketsForm.controls.emailControl.value,
      quantity : this.buyTicketsForm.controls.quantityControl.value
    }
    console.log(request)
    this.dataService.buyTicket(request).subscribe(response => {
      if (response.status==201){
        alert("Exito, se le ha enviado un email con el codigo");
        this.modalService.dismissAll();
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }


  reset() {
    this.buyTicketsForm.reset();
    this.buyTicketsForm.controls['showControl'].setValue('')
  }

  getShows(){
    this.shows=[]
    let idMovie=this.route.snapshot.params['id']
    this.dataService.getShows().subscribe((res:any)=>{
    res.forEach((show:any) => {
      if (show.id_movie==idMovie && show.tickets_availables>5)
      {
        show.date_time=new Date(show.date_time)
        show.date_time=show.date_time.toString()
        show.date_time=show.date_time.slice(0,21)
        this.shows.push(show)
      }
    });
    if(this.shows.length==0) {alert("No hay mas funciones disponibles")}
    })
  }
}
