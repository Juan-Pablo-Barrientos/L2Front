import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  radioStatus: boolean;
  mostViewedMovies:any=[];

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

    this.dataService.getGenres().subscribe((res:any)=>{
      this.genres=res;
    })

    this.route.queryParams.subscribe(params => {
      this.id_genre = params["id_genre"]
    })
    if(!this.dataService.movies.search){
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??= "").subscribe((res: any) => {
      this.dataService.movies=[]
      res.forEach((res:any)=> {
        this.dataService.movies.push(res)
      });
      this.mostViewedMovies=JSON.parse(JSON.stringify(this.dataService.movies));
      this.mostViewedMovies.forEach((mostViewedMovie:any) => {
        mostViewedMovie.ticketsBought=0
        mostViewedMovie.shows.forEach((showsFromMovie:any) => {
          mostViewedMovie.ticketsBought+=(200-showsFromMovie.tickets_availables)
        });
      });
      this.mostViewedMovies.sort(this.GetSortOrder('ticketsBought'))
      console.log(this.mostViewedMovies)
      console.log(this.mostViewedMovies.ticketsBought+"aca")
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

  genreFilter(event:any){
    {
      this.id_genre=event.target.value
      this.dataService.movies=[]
      this.dataService.getMovies(this.titleSearch ??= "",this.id_genre).subscribe((response: any) => {
      this.dataService.movies = response;
    });}}

  cleanFilter(){
    this.id_genre=null
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??='').subscribe((response: any) => {
    this.dataService.movies = response;
    this.radioStatus=false
    document.getElementById("searchMovie")?.setAttribute('value','')

    });
  }

}
