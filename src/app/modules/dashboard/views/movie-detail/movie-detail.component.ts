import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@gdp/shared/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

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
  shows:any;
  loggedUser:any;
  ratingIMDB:any;

  constructor(private dataService: DataService, private route: ActivatedRoute, private modalService: NgbModal, private authService:AuthService) {

    this.dataService.getMovie(this.route.snapshot.params['id']).subscribe((res:any) => {
      this.movie = res;
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

    this.buyTicketsForm=new FormGroup({
      theaterControl: new FormControl('',[Validators.required,]),
      showControl: new FormControl('',[Validators.required,]),
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
    this.modalService.open(content, {ariaLabelledBy: 'modalBuyTicket'}).result
  }

  onSubmitBuyTickets(){
    let request = {
      id_show : this.buyTicketsForm.controls.showControl.value,
      dniControl : this.buyTicketsForm.controls.dniControl.value,
      emailControl : this.buyTicketsForm.controls.emailControl.value,
      quantity : this.buyTicketsForm.controls.quantityControl.value
    }
    console.log(request)
    this.dataService.buyTicket(request).subscribe(response => {
      if (response.status==201){
        alert("Exito, se le ha enviado un email con el codigo");
        window.location.reload()
      }else{
        alert("Fallo el envio del formulario")
      }
    });
  }


  reset() {
    this.buyTicketsForm.reset();
    this.buyTicketsForm.controls['theaterControl'].setValue('')
    this.buyTicketsForm.controls['showControl'].setValue('')
  }

  onTheaterChange(){
    let request ={
      idTheater:this.buyTicketsForm.controls['theaterControl'].value,
      idMovie:this.route.snapshot.params['id']
    }
    this.dataService.getShowsByTheaterAndMovie(request).subscribe((res:any)=>
    this.shows=res
   )
  }
}
