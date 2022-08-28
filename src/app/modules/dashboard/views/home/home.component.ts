import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  images = [944, 1011, 984,1000,505,432,143,234,250].map((n) => `https://picsum.photos/id/${n}/900/500`);
  paused = false;
  pauseOnHover = true;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
