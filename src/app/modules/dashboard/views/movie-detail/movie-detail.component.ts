import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Title} from "@angular/platform-browser";
import { ToastrService } from 'ngx-toastr';


//Services
import { AuthService } from '@gdp/auth/services';
import { DataService } from '@gdp/shared/services';

declare const initGoogleApi:any;
declare const getVideos:any;

@Component({
  selector: 'gdp-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie:any
  buyTicketsForm:any;
  theaters:any;
  times:any;
  shows:any=[];
  loggedUser:any;
  ratingIMDB:any;
  movieYear:any='';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authService:AuthService,
    private titleService:Title,
    private toastr: ToastrService
    ) {
   }

  getBuyTicketsForm(){
    return this.buyTicketsForm.controls
  }

  ngOnInit():void {
      this.dataService.getMovie(this.route.snapshot.params['id']).subscribe((res:any) => {
      this.movie = res;
      this.titleService.setTitle(this.movie.name);
      if(this.movie){
      this.dataService.getMovieRating(res.name,res.year).subscribe((result:any)=>{
        this.movie.rating=result.results[0].vote_average
        getVideos(this.movie.name,this.movie.year)
      })
      }})
       if (this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).id_user){
        this.dataService.getUser(this.authService.getDecodedAccessToken(this.authService.getJwtToken()!).id_user).subscribe(
          (res:any) => this.loggedUser=res

        )
      }
  }


  openBuyTickets(content: any) {
    this.getShows(content)
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
  }

  onSubmitBuyTickets(){
    let request = {
      id_show : this.buyTicketsForm.controls.showControl.value,
      dni : this.buyTicketsForm.controls.dniControl.value,
      status: false,
      code: this.getRandomInt(999999),
      email : this.buyTicketsForm.controls.emailControl.value,
      quantity : this.buyTicketsForm.controls.quantityControl.value
    }
    this.dataService.buyTicket(request).subscribe(response => {
      if (response.status==201){
        this.toastr.success('Se le ha enviado un email con el c??digo', '??xito',{positionClass:'toast-bottom-right'});
        this.modalService.dismissAll();
      }else{
        this.toastr.error('No se ha podido reservar la entrada', '????',{positionClass:'toast-bottom-right'});
      }
    });
  }

  getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }

  reset() {
    this.buyTicketsForm.reset();
    this.buyTicketsForm.controls['showControl'].setValue('')
  }

  getShows(content: any){
    this.shows=[]
    let idMovie=this.route.snapshot.params['id']
    this.dataService.getShows().subscribe((res:any)=>{
    res.forEach((show:any) => {
      if (show.id_movie==idMovie && show.tickets_availables>5)
      {
        show.date_time=show.date_time.slice(0,4).concat(show.date_time.slice(7,10)).concat(show.date_time.slice(4,7)).concat(" ").concat(show.date_time.slice(11,16)).concat("Hs")
        this.shows.push(show)
      }
    });
    if(this.shows.length==0) {this.toastr.error('No hay mas funciones disponibles', '????',{positionClass:'toast-bottom-right'})}else{
    this.modalService.open(content, {ariaLabelledBy: 'modalBuyTicket'}).result}
    })
  }
}
