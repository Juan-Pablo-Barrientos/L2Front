import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithub,faNodeJs, faAngular, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faVideo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'gdp-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  faLinkedin=faLinkedin
  faGithub=faGithub
  faVideo=faVideo
  faNodeJs=faNodeJs
  faAngular=faAngular
  faYoutube=faYoutube
  faDatabase=faDatabase

  constructor() { }

  ngOnInit(): void {
  }

}
