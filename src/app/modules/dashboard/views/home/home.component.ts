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
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??= "").subscribe((res: any) => {
      this.dataService.movies=[]
      res.forEach((res:any)=> {
        this.dataService.movies.push(res)
      });
    });

  }

  genreFilter(event:any){
    {
      this.id_genre=event.target.value
      console.log(event.target.value)
      this.dataService.movies=[]
      this.dataService.getMovies(this.titleSearch ??= "",this.id_genre).subscribe((response: any) => {
      this.dataService.movies = response;
    });}}

  cleanFilter(){
    this.id_genre=null
    this.dataService.getMovies(this.titleSearch ??= "",this.id_genre ??='').subscribe((response: any) => {
    this.dataService.movies = response;
    this.radioStatus=false
    });
  }


}
