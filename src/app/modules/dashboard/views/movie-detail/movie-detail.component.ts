import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@gdp/shared/services';

@Component({
  selector: 'gdp-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie:any;

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.route.snapshot.params['id']) {
      this.dataService.getMovie(this.route.snapshot.params['id']).subscribe((res:any) => {
        this.movie = res;
        console.log(res)
      })

    }
  }

}
