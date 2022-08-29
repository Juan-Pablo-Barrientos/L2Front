import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gdp-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  movie:any;

  constructor() { }

  ngOnInit(): void {
  }

}
