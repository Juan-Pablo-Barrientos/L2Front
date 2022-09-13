import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

//Services
import { DataService } from '@gdp/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  paused = false;
  pauseOnHover = true;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;
  genreParams:any={};
  genres:any;
  titleSearch:any;
  id_genre:any;
  public imagesCinema: any = [];
  radioStatus: any;
  radio:any;
  radioForm:any;


  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  constructor(private route: ActivatedRoute, private router:Router, public dataService: DataService) { }

  ngOnInit(): void {

    this.radioForm = new FormGroup({
      genre: new FormControl('')
    })

    this.dataService.getGenres().subscribe((res:any)=>{
      this.genres=res;
    })


    this.route.queryParams.subscribe(params => {
      this.id_genre = params["id_genre"]
    })
    if(this.dataService.movies.search ===false || this.dataService.movies.search ===undefined){
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??= "").subscribe((res: any) => {
      this.imagesCinema = res;
      res.forEach((res:any)=> {
        this.dataService.movies.push(res)
      });
      this.dataService.mostViewedMovies=JSON.parse(JSON.stringify(this.dataService.movies));
      this.dataService.mostViewedMovies.forEach((mostViewedMovie:any) => {
        mostViewedMovie.ticketsBought=0
        mostViewedMovie.shows.forEach((showsFromMovie:any) => {
          mostViewedMovie.ticketsBought+=(200-showsFromMovie.tickets_availables)
        });
      });
      this.dataService.mostViewedMovies.sort(this.GetSortOrder('ticketsBought'))
    });
   }
   this.dataService.movies.search=0
  }

  GetSortOrder(prop:any) {
    return function(a:any, b:any) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
}

  genreFilter(){
    {
      this.dataService.movies=[]
      if(this.radioForm.controls['genre'].value){
      this.dataService.getMovies(this.titleSearch ??= "",this.radioForm.controls['genre'].value).subscribe((response: any) => {
      this.dataService.movies = response;
    });}}}

  cleanFilter(){
    this.id_genre=""
    this.radioForm.reset()
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??='').subscribe((response: any) => {
    this.dataService.movies = response;
    document.getElementById("searchMovie")?.setAttribute('value','')
    });
  }

}
